import { appendFileSync } from "fs";

export class Logger {
  private static readonly logFilePath = "error.log";

  public static error(context: string, error: unknown): void {
    const timestamp = new Date().toISOString();

    const message = error instanceof Error ? error.message : String(error);

    const stack =
      error instanceof Error && error.stack ? `\n${error.stack}` : "";

    const entry = `[${timestamp}] [${context}] ${message}${stack}\n`;

    try {
      appendFileSync(Logger.logFilePath, entry, "utf-8");
    } catch {
  
      console.error(entry);
    }
  }
}