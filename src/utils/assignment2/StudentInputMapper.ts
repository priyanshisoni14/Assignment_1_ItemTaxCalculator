import { StudentInput } from "../../models/assignment2/StudentInput";

export class StudentInputMapper {
  public map(record: Record<string, unknown>): StudentInput {
    return {
      fullName: record.fullName as string,
      age: record.age as number,
      address: record.address as string,
      rollNumber: record.rollNumber as number,
      courses: record.courses as StudentInput["courses"],
    };
  }
}
