import { StudentRegistration } from "../../student/StudentRegistration";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { Command } from "./Command";

export class AddStudentCommand implements Command {
  constructor(private readonly studentRegistration: StudentRegistration) {}

  public async execute(): Promise<boolean> {
    try {
      await this.studentRegistration.registerStudent();

      ConsoleUI.displayMessage("Student added successfully.");
    } catch (error) {
      ConsoleUI.displayCaughtError("AddStudentCommand.execute", error, "An unexpected error occurred.");
    }

    return true;
  }
}