import { Course } from "./Course";

export interface StudentRecord {
  id: string;
  fullName: string;
  age: number;
  address: string;
  rollNumber: number;
  courses: Course[];
}