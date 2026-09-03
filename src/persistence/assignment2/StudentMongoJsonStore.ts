import { mkdir, readFile, rename, writeFile } from "fs/promises";
import { dirname } from "path";
import { Course } from "../../models/assignment2/Course";
import { Student } from "../../models/assignment2/Student";
import { LogRecord, StudentStore } from "./StudentStore";

interface StudentDocument {
  _id: string;
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course[];
}

interface StudentDatabaseFile {
  database: string;
  collection: string;
  documents: StudentDocument[];
}

export class StudentMongoJsonStore implements StudentStore {
  private static readonly DATABASE_NAME = "student_management";
  private static readonly COLLECTION_NAME = "students";

  constructor(private readonly filePath: string) {}

  public async loadAll(): Promise<Student[]> {
    const file = await this.readFile();

    return file.documents.map((document) => this.toStudent(document));
  }

  public async appendAll(records: LogRecord[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    const file = await this.readFile();

    const documentsById = new Map<string, StudentDocument>(
      file.documents.map((document) => [document._id, document]),
    );

    for (const record of records) {
      if (record.op === "insert") {
        documentsById.set(
          record.student.id,
          this.toDocument(record.student),
        );
      } else {
        documentsById.delete(record.id);
      }
    }

    await this.writeFile({
      database: StudentMongoJsonStore.DATABASE_NAME,
      collection: StudentMongoJsonStore.COLLECTION_NAME,
      documents: [...documentsById.values()],
    });
  }

  private async readFile(): Promise<StudentDatabaseFile> {
    try {
      const raw = await readFile(this.filePath, "utf-8");

      const parsed = JSON.parse(raw) as StudentDatabaseFile;

      return {
        database: parsed.database ?? StudentMongoJsonStore.DATABASE_NAME,
        collection: parsed.collection ?? StudentMongoJsonStore.COLLECTION_NAME,
        documents: parsed.documents ?? [],
      };
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as NodeJS.ErrnoException).code === "ENOENT"
      ) {
        return {
          database: StudentMongoJsonStore.DATABASE_NAME,
          collection: StudentMongoJsonStore.COLLECTION_NAME,
          documents: [],
        };
      }

      throw error;
    }
  }

  private async writeFile(file: StudentDatabaseFile): Promise<void> {
    const directory = dirname(this.filePath);

    if (directory && directory !== ".") {
      await mkdir(directory, { recursive: true });
    }

    const tempFilePath = `${this.filePath}.tmp`;

    await writeFile(tempFilePath, JSON.stringify(file, null, 2), "utf-8");

    await rename(tempFilePath, this.filePath);
  }

  private toDocument(student: Student): StudentDocument {
    return {
      _id: student.id,
      fullName: student.fullName,
      age: student.age,
      address: student.address,
      rollNumber: student.rollNumber,
      courses: student.courses,
    };
  }

  private toStudent(document: StudentDocument): Student {
    return new Student(
      document._id,
      document.fullName,
      document.age,
      document.address,
      document.rollNumber,
      document.courses.map((course) => course as Course),
    );
  }
}