import {Student} from "../models/assignment2/Student";
import {LogRecord, StudentLogStore} from "../persistence/assignment2/StudentLogStore";
import {StudentSorter} from "../sorter/StudentSorter";

export class StudentRepository {

    private students: Student[] = [];

    private pendingOperations: LogRecord[] = [];

    constructor(
        private readonly logStore: StudentLogStore,
        private readonly studentSorter: StudentSorter = new StudentSorter()
    ) {}

    public async load(): Promise<void> {

        const loadedStudents =
            await this.logStore.loadAll();

        this.students =
            this.studentSorter.sortDefault(
                loadedStudents
            );

        this.pendingOperations = [];
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
            this.studentSorter.insertInDefaultOrder(
                this.students,
                student
            );

        this.pendingOperations.push({
            op: "insert",
            student
        });
    }

    public deleteByRollNumber(
        rollNumber: number
    ): boolean {

        const student =
            this.findByRollNumber(rollNumber);

        if (student === undefined) {
            return false;
        }

        this.students =
            this.students.filter(
                existingStudent =>
                    existingStudent.rollNumber !== rollNumber
            );

        this.pendingOperations.push({
            op: "delete",
            id: student.id
        });

        return true;
    }

    public findByRollNumber(
        rollNumber: number
    ): Student | undefined {

        return this.students.find(
            student =>
                student.rollNumber === rollNumber
        );
    }

    public getStudents(): Student[] {

        return [...this.students];
    }

    public hasUnsavedChanges(): boolean {

        return this.pendingOperations.length > 0;
    }

    public async save(): Promise<void> {

        await this.logStore.appendAll(
            this.pendingOperations
        );

        this.pendingOperations = [];
    }
}