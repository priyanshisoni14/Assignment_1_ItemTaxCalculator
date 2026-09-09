import { randomUUID } from "crypto";
import { Course } from "./Course";
import { StudentInput } from "./StudentInput";
import { StudentRecord } from "./StudentRecord";

export class Student {
  private constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly age: number,
    public readonly address: string,
    public readonly rollNumber: number,
    public readonly courses: Course[],
  ) {}

  public static register(input: StudentInput): Student {
    return new Student(
      randomUUID(),
      input.fullName,
      input.age,
      input.address,
      input.rollNumber,
      input.courses,
    );
  }

  public static fromRecord(record: StudentRecord): Student {
    return new Student(
      record.id,
      record.fullName,
      record.age,
      record.address,
      record.rollNumber,
      record.courses,
    );
  }
}