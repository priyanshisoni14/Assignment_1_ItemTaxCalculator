import { StudentRepository } from "../../student/StudentRepository";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { Command } from "./Command";

export class ExitCommand implements Command {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async execute(): Promise<boolean> {
    const saveChanges = await this.askShouldSave();

    if (!saveChanges) {
      ConsoleUI.displayMessage("Exiting without saving.");

      return false;
    }

    try {
      await this.studentRepository.save();

      ConsoleUI.displayMessage("User details saved successfully.");

      return false;
    } catch (error) {
      ConsoleUI.displayCaughtError(error, "Unable to save user details.");

      return true;
    }
  }

  private async askShouldSave(): Promise<boolean> {
    while (true) {
      const answer = (
        await ConsoleUI.askQuestion(
          "\nDo you want to save latest changes? (y/n): ",
        )
      )
        .trim()
        .toLowerCase();

      if (answer === "y" || answer === "yes") {
        return true;
      }

      if (answer === "n" || answer === "no") {
        return false;
      }

      ConsoleUI.displayMessage("Please enter y or n.");
    }
  }
}