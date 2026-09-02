import {readFile, writeFile} from "fs/promises";
import {Course} from "../models/assignment2/Course";
import {Student} from "../models/assignment2/Student";

export class StudentSerializer {

    constructor(
        private readonly filePath: string
    ) {}

    public async save(students: Student[]): Promise<void> {

        const data =
            JSON.stringify(
                students,
                null,
                2
            );

        await writeFile(
            this.filePath,
            data,
            "utf-8"
        );
    }

    public async load(): Promise<Student[]> {

        try {

            const data =
                await readFile(
                    this.filePath,
                    "utf-8"
                );

            const students =
                JSON.parse(data) as Student[];

            return students.map(
                student =>
                    new Student(
                        student.fullName,
                        student.age,
                        student.address,
                        student.rollNumber,
                        student.courses.map(
                            course =>
                                course as Course
                        )
                    )
            );

        } catch (error) {

            if (
                error instanceof Error &&
                "code" in error &&
                error.code === "ENOENT"
            ) {
                return [];
            }

            throw error;
        }
    }
}