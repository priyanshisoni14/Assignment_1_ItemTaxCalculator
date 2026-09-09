export class Logger {
  public static error(
    context: string,
    error: unknown,
    fallbackMessage?: string,
  ): void {
    const timestamp = new Date().toISOString();

    const message =
      error instanceof Error ? error.message : fallbackMessage ?? String(error);

    console.error(`[${timestamp}] [${context}] ${message}`);
  }
}