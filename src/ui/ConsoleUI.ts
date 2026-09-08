import * as readline from "readline";

export class ConsoleUI {
  private static readonly rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  public static askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      ConsoleUI.rl.question(question, resolve);
    });
  }

  public static displayMessage(message: string): void {
    console.log(message);
  }

  public static displayError(message: string): void {
    console.error(`\nError: ${message}`);
  }

  public static displayCaughtError(error: unknown, fallbackMessage: string): void {
    ConsoleUI.displayError(error instanceof Error ? error.message : fallbackMessage);
  }

  public static displayTable(details: Record<string, string | number>[]): void {
    console.table(details);
  }

  public static close(): void {
    ConsoleUI.rl.close();
  }
}