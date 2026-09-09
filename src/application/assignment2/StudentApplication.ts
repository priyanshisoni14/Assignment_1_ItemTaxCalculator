import { CommandRegistry } from "../../command/assignment2/CommandRegistry";
import { StudentApplicationConfig } from "../../config/assignment2/StudentApplicationConfig";
import { ConsoleUI } from "../../ui/ConsoleUI";

export class StudentApplication {
  private static instance: StudentApplication;
  private initialized = false;

  private constructor(
    private readonly commandRegistry: CommandRegistry,
    private readonly loadStudents: () => Promise<void>,
  ) {}

  public static getInstance(): StudentApplication {
    if (StudentApplication.instance === undefined) {
      const dependencies = StudentApplicationConfig.create();

      StudentApplication.instance = new StudentApplication(
        dependencies.commandRegistry,
        dependencies.loadStudents,
      );
    }

    return StudentApplication.instance;
  }

  public async run(): Promise<void> {
    if (!this.initialized) {
      await this.loadStudents();
      this.initialized = true;
    }

    let isRunning = true;

    while (isRunning) {
      this.displayMenu();

      const selectedOption = await this.getMenuOption();

      const command = this.commandRegistry.getCommand(selectedOption);

      if (command === undefined) {
        ConsoleUI.displayMessage(
          "Invalid option. Please select an option from 1 to 5.",
        );

        continue;
      }

      isRunning = await command.execute();
    }
  }

  private displayMenu(): void {
    ConsoleUI.displayMessage(
      [
        "\nStudent Management System",
        "1. Add User details",
        "2. Display User details",
        "3. Delete User details",
        "4. Save User details",
        "5. Exit",
      ].join("\n"),
    );
  }

  private async getMenuOption(): Promise<string> {
    return (await ConsoleUI.askQuestion("\nSelect an option: ")).trim();
  }
}