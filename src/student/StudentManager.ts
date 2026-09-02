import { Student }
    from "../models/assignment2/Student";

import { StudentSorter }
    from "../sorter/StudentSorter";

export class StudentManager {

    private students: Student[] = [];

    constructor(
        private readonly studentSorter:
            StudentSorter = new StudentSorter()
    ) {}

    public addStudent(
        student: Student
    ): void {

        const existingStudent =
            this.findStudentByRollNumber(
                student.rollNumber
            );

        if (
            existingStudent !== undefined
        ) {
            throw new Error(
                `A student with roll number ${student.rollNumber} already exists.`
            );
        }

        this.students.push(
            student
        );

        this.sortStudentsByDefault();
    }

    public findStudentByRollNumber(
        rollNumber: number
    ): Student | undefined {

        return this.students.find(
            student =>
                student.rollNumber === rollNumber
        );
    }

    public deleteStudentByRollNumber(
        rollNumber: number
    ): boolean {

        const studentIndex =
            this.students.findIndex(
                student =>
                    student.rollNumber === rollNumber
            );

        if (studentIndex === -1) {
            return false;
        }

        this.students.splice(
            studentIndex,
            1
        );

        return true;
    }

    public getStudents(): Student[] {

        return [...this.students];
    }

    public setStudents(
        students: Student[]
    ): void {

        this.students = [
            ...students
        ];

        this.sortStudentsByDefault();
    }

    private sortStudentsByDefault(): void {

        this.students =
            this.studentSorter.sortDefault(
                this.students
            );
    }
}