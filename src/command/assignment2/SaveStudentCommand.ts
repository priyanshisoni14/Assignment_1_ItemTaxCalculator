import {StudentRepository} from "../../student/StudentRepository";
import {ConsoleUI} from "../../ui/ConsoleUI";
import {Command} from "./Command";

export class SaveStudentCommand implements Command {

    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly ui: ConsoleUI
    ) {}

    public async execute(): Promise<boolean> {

        try {

            await this.studentRepository.save();

            this.ui.displayMessage(
                "User details saved successfully."
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to save user details.";

            this.ui.displayError(message);
        }

        return true;
    }
}