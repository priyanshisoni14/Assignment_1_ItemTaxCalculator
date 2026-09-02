import { Course } from "./Course";

export interface StudentInput {
    fullName: string;
    age: number;
    address: string;
    rollNumber: number;
    courses: Course[];
}