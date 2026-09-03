import { randomUUID } from "crypto";

import { Student } from "../../models/assignment2/Student";

import { StudentInput } from "../../models/assignment2/StudentInput";

export class StudentFactory {
  public create(input: StudentInput): Student {
    return new Student(
      randomUUID(),
      input.fullName,
      input.age,
      input.address,
      input.rollNumber,
      input.courses,
    );
  }
}
