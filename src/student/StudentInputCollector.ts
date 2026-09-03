import { studentInputConfig } from "../config/assignment2/StudentInputConfig";
import { InputConfig } from "../models/InputConfig";
import { InputParser } from "../parser/InputParser";
import { ConsoleUI } from "../ui/ConsoleUI";

export class StudentInputCollector {
  constructor(private readonly ui: ConsoleUI) {}

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

    return {
      fullName,
      age,
      address,
      rollNumber,
      courses,
    };
  }

  private async collectField(field: string, question: string): Promise<string> {
    const fieldConfig: InputConfig = {
      [field]: studentInputConfig[field],
    };

    const parser = new InputParser(fieldConfig);

    while (true) {
      const value = await this.ui.askQuestion(question);

      try {
        parser.parseRecord({
          [field]: value,
        });

        return value;
      } catch (error) {
        if (error instanceof Error) {
          this.ui.displayError(error.message);
        } else {
          this.ui.displayError("Invalid input.");
        }
      }
    }
  }
}
