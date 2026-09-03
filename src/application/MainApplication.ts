import { Application } from "./assignment1/Application";
import { StudentApplication } from "./assignment2/StudentApplication";
import { ConsoleUI } from "../ui/ConsoleUI";

export class MainApplication {
  private static instance: MainApplication;

  private constructor(
    private readonly ui: ConsoleUI,
    private readonly itemApplication: Application,
    private readonly studentApplication: StudentApplication,
  ) {}

  public static getInstance(ui: ConsoleUI): MainApplication {
    if (MainApplication.instance === undefined) {
      MainApplication.instance = new MainApplication(
        ui,
        Application.getInstance(ui),
        StudentApplication.getInstance(ui),
      );
    }

    return MainApplication.instance;
  }

  public async run(): Promise<void> {
    let isRunning = true;

    while (isRunning) {
      this.displayMenu();

      const option = (await this.ui.askQuestion("\nSelect an option: ")).trim();

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
          this.ui.displayMessage("Invalid option. Please select 1, 2, or 3.");
      }
    }

    this.ui.displayMessage("\nApplication terminated.");

    this.ui.close();
  }

  private displayMenu(): void {
    this.ui.displayMessage(
      [
        "\nMain Menu",
        "1. Item Tax Calculator",
        "2. Student Management",
        "3. Exit",
      ].join("\n"),
    );
  }
}
