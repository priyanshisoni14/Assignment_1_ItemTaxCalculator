import { Course } from "./Course";

export class Student {

    constructor(
        public readonly fullName: string,
        public readonly age: number,
        public readonly address: string,
        public readonly rollNumber: number,
        public readonly courses: Course[]
    ) {}
}