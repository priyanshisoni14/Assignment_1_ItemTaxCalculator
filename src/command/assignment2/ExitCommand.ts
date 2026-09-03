import {StudentRepository} from "../../student/StudentRepository";
import {ConsoleUI} from "../../ui/ConsoleUI";
import {Command} from "./Command";

export class ExitCommand implements Command {

    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly ui: ConsoleUI
    ) {}

    public async execute(): Promise<boolean> {

        const saveChanges =
            await this.ui.askQuestion(
                "\nDo you want to save latest changes? (y/n): "
            );

        if (
            saveChanges.trim().toLowerCase() !== "y"
        ) {
            return false;
        }

        try {

            await this.studentRepository.save();

            this.ui.displayMessage(
                "User details saved successfully."
            );

            return false;

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to save user details.";

            this.ui.displayError(message);

            return true;
        }
    }
}