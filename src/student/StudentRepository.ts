import {Student} from "../models/assignment2/Student";
import {StudentStore} from "../persistence/assignment2/StudentStore";
import {StudentSorter} from "../sorter/StudentSorter";

export class StudentRepository {

    private students: Student[] = [];

    private unsavedChangesExist = false;

    constructor(
        private readonly store: StudentStore,
        private readonly studentSorter: StudentSorter = new StudentSorter()
    ) {}

    public async load(): Promise<void> {

        const loadedStudents =
            await this.store.load();

        this.students =
            this.studentSorter.sortDefault(
                loadedStudents
            );

        this.unsavedChangesExist = false;
    }

    public addStudent(
        student: Student
    ): void {

        if (
            this.findByRollNumber(
                student.rollNumber
            ) !== undefined
        ) {
            throw new Error(
                `A student with roll number ${student.rollNumber} already exists.`
            );
        }

        this.students =
            this.studentSorter.sortDefault([
                ...this.students,
                student
            ]);

        this.unsavedChangesExist = true;
    }

    public deleteByRollNumber(
        rollNumber: number
    ): boolean {

        const originalCount = this.students.length;

        this.students =
            this.students.filter(
                existingStudent =>
                    existingStudent.rollNumber !== rollNumber
            );

        if (this.students.length === originalCount) {
            return false;
        }

        this.unsavedChangesExist = true;

        return true;
    }

    public findByRollNumber(
        rollNumber: number
    ): Student | undefined {

        return this.students.find(
            existingStudent =>
                existingStudent.rollNumber === rollNumber
        );
    }

    public getStudents(): Student[] {

        return [...this.students];
    }

    public hasUnsavedChanges(): boolean {

        return this.unsavedChangesExist;
    }

    public async save(): Promise<void> {

        if (!this.unsavedChangesExist) {
            return;
        }

        await this.store.save(
            this.students
        );

        this.unsavedChangesExist = false;
    }
}