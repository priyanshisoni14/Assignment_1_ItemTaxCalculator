import {Student} from "../models/assignment2/Student";
import {StudentStore} from "../persistence/assignment2/StudentStore";
import {StudentSorter} from "../sorter/StudentSorter";

export class StudentRepository {

    private students: Student[] = [];

    private studentsByRollNumber:
        Map<number, Student> = new Map();

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

        this.rebuildIndex();

        this.unsavedChangesExist = false;
    }

    public addStudent(
        student: Student
    ): void {

        if (
            this.studentsByRollNumber.has(
                student.rollNumber
            )
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

        this.rebuildIndex();

        this.unsavedChangesExist = true;
    }

    public deleteByRollNumber(
        rollNumber: number
    ): boolean {

        const student =
            this.studentsByRollNumber.get(rollNumber);

        if (student === undefined) {
            return false;
        }

        this.students =
            this.students.filter(
                existingStudent =>
                    existingStudent.rollNumber !== rollNumber
            );

        this.studentsByRollNumber.delete(
            rollNumber
        );

        this.unsavedChangesExist = true;

        return true;
    }

    public findByRollNumber(
        rollNumber: number
    ): Student | undefined {

        return this.studentsByRollNumber.get(
            rollNumber
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

    private rebuildIndex(): void {

        this.studentsByRollNumber =
            new Map(
                this.students.map(
                    student => [student.rollNumber, student]
                )
            );
    }
}