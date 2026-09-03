import { appendFile, readFile, writeFile } from "fs/promises";
import { Course } from "../../models/assignment2/Course";
import { Student } from "../../models/assignment2/Student";

type InsertLogRecord = {
  op: "insert";
  student: Student;
};

type DeleteLogRecord = {
  op: "delete";
  id: string;
};

export type LogRecord = InsertLogRecord | DeleteLogRecord;

export class StudentLogStore {
  constructor(private readonly filePath: string) {}

  public async insert(student: Student): Promise<void> {
    await this.appendRecord({
      op: "insert",
      student,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.appendRecord({
      op: "delete",
      id,
    });
  }

  public async appendAll(records: LogRecord[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    const content =
      records.map((record) => JSON.stringify(record)).join("\n") + "\n";

    await appendFile(this.filePath, content, "utf-8");
  }

  public async loadAll(): Promise<Student[]> {
    const lines = await this.readLines();

    const studentsById = new Map<string, Student>();

    for (const line of lines) {
      const record = JSON.parse(line) as LogRecord;

      if (record.op === "insert") {
        studentsById.set(record.student.id, this.toStudent(record.student));
      } else {
        studentsById.delete(record.id);
      }
    }

    return [...studentsById.values()];
  }

  public async compact(students: Student[]): Promise<void> {
    const lines = students.map((student) =>
      JSON.stringify({
        op: "insert",
        student,
      } as InsertLogRecord),
    );

    const content = lines.length > 0 ? lines.join("\n") + "\n" : "";

    await writeFile(this.filePath, content, "utf-8");
  }

  private async appendRecord(record: LogRecord): Promise<void> {
    await appendFile(this.filePath, JSON.stringify(record) + "\n", "utf-8");
  }

  private async readLines(): Promise<string[]> {
    try {
      const data = await readFile(this.filePath, "utf-8");

      return data.split("\n").filter((line: string) => line.trim().length > 0);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return [];
      }

      throw error;
    }
  }

  private toStudent(raw: Student): Student {
    return new Student(
      raw.id,
      raw.fullName,
      raw.age,
      raw.address,
      raw.rollNumber,
      raw.courses.map((course) => course as Course),
    );
  }
}