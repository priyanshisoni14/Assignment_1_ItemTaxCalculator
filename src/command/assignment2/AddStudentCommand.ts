import { StudentRegistration } from "../../student/StudentRegistration";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { Command } from "./Command";

export class AddStudentCommand implements Command {
  constructor(
    private readonly studentRegistration: StudentRegistration,
    private readonly ui: ConsoleUI,
  ) {}

  public async execute(): Promise<boolean> {
    try {
      await this.studentRegistration.registerStudent();

      this.ui.displayMessage("Student added successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      this.ui.displayError(message);
    }

    return true;
  }
}
