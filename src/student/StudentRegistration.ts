import {
    StudentInputCollector
} from "./StudentInputCollector";

import {
    StudentManager
} from "./StudentManager";

import {
    StudentFactory
} from "../factory/assignment2/StudentFactory";

import {
    StudentInput
} from "../models/assignment2/StudentInput";

import {
    InputParser
} from "../parser/InputParser";


export class StudentRegistration {

    constructor(
        private readonly inputCollector:
            StudentInputCollector,

        private readonly inputParser:
            InputParser,

        private readonly studentFactory:
            StudentFactory,

        private readonly studentManager:
            StudentManager
    ) {}

    public async registerStudent():
        Promise<void> {

        const rawInput =
            await this.inputCollector.collect();

        const parsedRecord =
            this.inputParser.parseRecord(
                rawInput
            );

        const studentInput: StudentInput = {
            fullName:
                parsedRecord.fullName as string,

            age:
                parsedRecord.age as number,

            address:
                parsedRecord.address as string,

            rollNumber:
                parsedRecord.rollNumber as number,

            courses:
                parsedRecord.courses as StudentInput["courses"]
        };

        const existingStudent =
            this.studentManager.findStudentByRollNumber(
                studentInput.rollNumber
            );

        if (existingStudent !== undefined) {
            throw new Error(
                `A student with roll number ${studentInput.rollNumber} already exists.`
            );
        }

        const student =
            this.studentFactory.create(
                studentInput
            );

        this.studentManager.addStudent(
            student
        );
    }
}