import {ConsoleUI} from "../ui/ConsoleUI";
import {StudentManager} from "./StudentManager";


export class StudentDeletion {

    constructor(
        private readonly studentManager:
            StudentManager,

        private readonly ui:
            ConsoleUI
    ) {}


    public async deleteStudent():
        Promise<void> {

        const rollNumberInput =
            await this.ui.askQuestion(
                "\nEnter roll number to delete: "
            );

        const rollNumber =
            Number(
                rollNumberInput.trim()
            );

        if (
            !Number.isInteger(rollNumber) ||
            rollNumber <= 0
        ) {

            this.ui.displayError(
                "Roll number must be a positive integer."
            );

            return;
        }

        const deleted =
            this.studentManager
                .deleteStudentByRollNumber(
                    rollNumber
                );

        if (deleted) {

            this.ui.displayMessage(
                `Student with roll number ${rollNumber} deleted successfully.`
            );

            return;
        }

        this.ui.displayMessage(
            `No student found with roll number ${rollNumber}.`
        );
    }
}