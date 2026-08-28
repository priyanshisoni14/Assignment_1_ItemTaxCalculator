import * as readline from "readline";

export class ConsoleUI {

    private readonly rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    askQuestion(
        question: string
    ): Promise<string> {

        return new Promise((resolve) => {
            this.rl.question(
                question,
                resolve
            );
        });
    }

    displayMessage(message: string): void {
        console.log(message);
    }

    displayError(message: string): void {
        console.error(`\nError: ${message}`);
    }

    close(): void {
        this.rl.close();
    }
}