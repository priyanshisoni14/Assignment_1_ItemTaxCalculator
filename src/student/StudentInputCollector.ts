import {
    ConsoleUI
} from "../ui/ConsoleUI";


export class StudentInputCollector {

    constructor(
        private readonly ui:
            ConsoleUI
    ) {}

    public async collect():
        Promise<Record<string, string>> {

        const fullName =
            await this.ui.askQuestion(
                "Enter full name: "
            );

        const age =
            await this.ui.askQuestion(
                "Enter age: "
            );

        const address =
            await this.ui.askQuestion(
                "Enter address: "
            );

        const rollNumber =
            await this.ui.askQuestion(
                "Enter roll number: "
            );

        const courses =
            await this.ui.askQuestion(
                "Select exactly 4 courses from A, B, C, D, E, F (comma-separated): "
            );

        return {
            fullName,
            age,
            address,
            rollNumber,
            courses
        };
    }
}