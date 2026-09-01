import * as readline from "readline";

export class ConsoleUI {

    private readonly rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    public askQuestion(
        question: string
    ): Promise<string> {

        return new Promise((resolve) => {

            this.rl.question(
                question,
                resolve
            );
        });
    }

    public displayMessage(
        message: string
    ): void {

        console.log(message);
    }

    public displayError(
        message: string
    ): void {

        console.error(
            `\nError: ${message}`
        );
    }

    public displayTable(
        details: Record<
            string,
            string | number
        >[]
    ): void {

        console.table(
            details
        );
    }

    public close(): void {

        this.rl.close();
    }
}