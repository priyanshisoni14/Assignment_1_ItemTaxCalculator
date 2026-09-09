import { Application } from "./assignment1/Application";
import { StudentApplication } from "./assignment2/StudentApplication";
import { ConsoleUI } from "../ui/ConsoleUI";

export class MainApplication {
  private static instance: MainApplication;

  private constructor(
    private readonly itemApplication: Application,
    private readonly studentApplication: StudentApplication,
  ) {}

  public static getInstance(): MainApplication {
    if (MainApplication.instance === undefined) {
      MainApplication.instance = new MainApplication(
        Application.getInstance(),
        StudentApplication.getInstance(),
      );
    }

    return MainApplication.instance;
  }

  public async run(): Promise<void> {
    let isRunning = true;

    while (isRunning) {
      this.displayMenu();

      const option = (await ConsoleUI.askQuestion("\nSelect an option: ")).trim();

      switch (option) {
        case "1":
          await this.itemApplication.run();
          break;

        case "2":
          await this.studentApplication.run();
          break;

        case "3":
          isRunning = false;
          break;

        default:
          ConsoleUI.displayMessage("Invalid option. Please select 1, 2, or 3.");
      }
    }

    ConsoleUI.displayMessage("\nApplication terminated.");

    ConsoleUI.close();
  }

  private displayMenu(): void {
    ConsoleUI.displayMessage(
      [
        "\nMain Menu",
        "1. Item Tax Calculator",
        "2. Student Management",
        "3. Exit",
      ].join("\n"),
    );
  }
}