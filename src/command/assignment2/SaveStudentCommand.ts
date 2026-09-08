import { StudentRepository } from "../../student/StudentRepository";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { Command } from "./Command";

export class SaveStudentCommand implements Command {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async execute(): Promise<boolean> {
    try {
      await this.studentRepository.save();

      ConsoleUI.displayMessage("User details saved successfully.");
    } catch (error) {
      ConsoleUI.displayCaughtError(error, "Unable to save user details.");
    }

    return true;
  }
}