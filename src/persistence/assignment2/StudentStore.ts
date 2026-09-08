import { Student } from "../../models/assignment2/Student";

export interface StudentStore {
  load(): Promise<Student[]>;
  save(students: Student[]): Promise<void>;
}