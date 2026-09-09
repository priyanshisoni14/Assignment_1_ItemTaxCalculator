import { readFile, rename, writeFile } from "fs/promises";
import { Course } from "../../models/assignment2/Course";
import { Student } from "../../models/assignment2/Student";
import { Logger } from "../../logger/Logger";

export interface StudentReaderWriter {
  load(): Promise<Student[]>;
  save(students: Student[]): Promise<void>;
}

interface StudentRecord {
  id: string;
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course[];
}

export class StudentFileReaderWriter implements StudentReaderWriter {
  constructor(private readonly filePath: string) {}

  public async load(): Promise<Student[]> {
    try {
      const raw = await readFile(this.filePath, "utf-8");

      const records = JSON.parse(raw) as StudentRecord[];

      return records.map((record) => this.toStudent(record));
    } catch (error) {
      if (this.isFileNotFoundError(error)) {
  
        return [];
      }

      await this.recoverFromCorruptedFile(error);

      return [];
    }
  }

  public async save(students: Student[]): Promise<void> {
    const records = students.map((student) => this.toRecord(student));

    await writeFile(this.filePath, JSON.stringify(records, null, 2), "utf-8");
  }

  private isFileNotFoundError(error: unknown): boolean {
    return (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    );
  }


  private async recoverFromCorruptedFile(error: unknown): Promise<void> {
    Logger.error("StudentFileReaderWriter.load", error);

    const backupPath = `${this.filePath}.corrupted-${Date.now()}.bak`;

    try {
      await rename(this.filePath, backupPath);

      console.warn(
        `Warning: ${this.filePath} could not be read (${
          error instanceof Error ? error.message : "unknown error"
        }). Backed up to ${backupPath}; starting with an empty student list.`,
      );
    } catch {
      console.warn(
        `Warning: ${this.filePath} could not be read and could not be backed up. Starting with an empty student list.`,
      );
    }
  }

  private toRecord(student: Student): StudentRecord {
    return {
      id: student.id,
      fullName: student.fullName,
      age: student.age,
      address: student.address,
      rollNumber: student.rollNumber,
      courses: student.courses,
    };
  }

  private toStudent(record: StudentRecord): Student {
    return new Student(
      record.id,
      record.fullName,
      record.age,
      record.address,
      record.rollNumber,
      record.courses.map((course) => course as Course),
    );
  }
}