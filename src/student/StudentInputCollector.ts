import { ConsoleUI } from "../ui/ConsoleUI";
import { SingleFieldValidator } from "../utils/assignment2/SingleFieldValidator";

export class StudentInputCollector {
  constructor(private readonly singleFieldValidator: SingleFieldValidator) {}

  public async collect(): Promise<Record<string, string>> {
    const fullName = await this.collectField("fullName", "Enter full name: ");

    const age = await this.collectField("age", "Enter age: ");

    const address = await this.collectField("address", "Enter address: ");

    const rollNumber = await this.collectField(
      "rollNumber",
      "Enter roll number: ",
    );

    const courses = await this.collectField(
      "courses",
      "Select exactly 4 courses from A, B, C, D, E, F (comma-separated): ",
    );

    return { fullName, age, address, rollNumber, courses };
  }

  private async collectField(field: string, question: string): Promise<string> {
    while (true) {
      const value = await ConsoleUI.askQuestion(question);

      const errorMessage = this.singleFieldValidator.validate(field, value);

      if (errorMessage === undefined) {
        return value;
      }

      ConsoleUI.displayError(errorMessage);
    }
  }
}