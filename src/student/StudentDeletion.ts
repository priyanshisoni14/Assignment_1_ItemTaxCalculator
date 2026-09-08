import { ConsoleUI } from "../ui/ConsoleUI";
import { StudentRepository } from "./StudentRepository";
import { SingleFieldValidator } from "../utils/assignment2/SingleFieldValidator";

export class StudentDeletion {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly singleFieldValidator: SingleFieldValidator,
  ) {}

  public async deleteStudent(): Promise<void> {
    const rollNumberInput = await ConsoleUI.askQuestion(
      "\nEnter roll number to delete: ",
    );

    const errorMessage = this.singleFieldValidator.validate(
      "rollNumber",
      rollNumberInput,
    );

    if (errorMessage !== undefined) {
      ConsoleUI.displayError(errorMessage);

      return;
    }

    const rollNumber = Number(rollNumberInput.trim());

    const deleted = this.studentRepository.deleteByRollNumber(rollNumber);

    if (deleted) {
      ConsoleUI.displayMessage(
        `Student with roll number ${rollNumber} deleted successfully.`,
      );

      return;
    }

    ConsoleUI.displayMessage(`No student found with roll number ${rollNumber}.`);
  }
}