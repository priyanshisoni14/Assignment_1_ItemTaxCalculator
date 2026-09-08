import { readFile, writeFile } from "fs/promises";
import { Course } from "../../models/assignment2/Course";
import { Student } from "../../models/assignment2/Student";
import { StudentStore } from "./StudentStore";

interface StudentRecord {
  id: string;
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course[];
}

export class StudentJsonStore implements StudentStore {

  constructor(private readonly filePath: string) {}

  public async load(): Promise<Student[]> {

    try {

      const raw = await readFile(this.filePath, "utf-8");

      const records = JSON.parse(raw) as StudentRecord[];

      return records.map((record) => this.toStudent(record));

    } catch (error) {

      if (
        error instanceof Error &&
        "code" in error &&
        (error as NodeJS.ErrnoException).code === "ENOENT"
      ) {
        // No file yet — first run. Start with an empty list.
        return [];
      }

      throw error;
    }
  }

  public async save(students: Student[]): Promise<void> {

    const records = students.map((student) => this.toRecord(student));

    await writeFile(
      this.filePath,
      JSON.stringify(records, null, 2),
      "utf-8",
    );
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