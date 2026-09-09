import * as readline from "readline";
import { Logger } from "../logger/Logger";

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

  /**
   * Displays a short, friendly message to the person using the app,
   * while separately logging the technical detail (which file and
   * function it came from, plus the full stack trace when available)
   * to error.log via Logger — so a bug report always has an exact
   * throwing location, not just whatever fallback text the user saw.
   *
   * context should identify where this was caught, in
   * "ClassName.methodName" form, e.g. "StudentRegistration.registerStudent".
   */
  public static displayCaughtError(
    context: string,
    error: unknown,
    fallbackMessage: string,
  ): void {
    Logger.error(context, error);

    ConsoleUI.displayError(
      error instanceof Error ? error.message : fallbackMessage,
    );
  }

  public static displayTable(details: Record<string, string | number>[]): void {
    console.table(details);
  }

  public static close(): void {
    ConsoleUI.rl.close();
  }
}