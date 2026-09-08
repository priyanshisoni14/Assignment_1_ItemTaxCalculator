import {Student} from "../models/assignment2/Student";
import {LogRecord, StudentStore} from "../persistence/assignment2/StudentStore";
import {StudentSorter} from "../sorter/StudentSorter";

export class StudentRepository {

    private studentsByRollNumber:
        Map<number, Student> = new Map();

    private pendingOperations: LogRecord[] = [];

    constructor(
        private readonly logStore: StudentStore,
        private readonly studentSorter: StudentSorter = new StudentSorter()
    ) {}

    public async load(): Promise<void> {

        const loadedStudents =
            await this.logStore.loadAll();

        this.studentsByRollNumber =
            new Map(
                loadedStudents.map(
                    student => [student.rollNumber, student]
                )
            );

        this.pendingOperations = [];
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

        this.studentsByRollNumber.set(
            student.rollNumber,
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
            this.studentsByRollNumber.get(rollNumber);

        if (student === undefined) {
            return false;
        }

        this.studentsByRollNumber.delete(
            rollNumber
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

        return this.studentsByRollNumber.get(
            rollNumber
        );
    }

    public getStudents(): Student[] {

        return this.studentSorter.sortDefault(
            [...this.studentsByRollNumber.values()]
        );
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