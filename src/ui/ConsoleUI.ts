import * as readline from "readline";

export class ConsoleUI {

    private readonly rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(
                question,
                resolve
            );
        });
    }

    displayItemResult(
        itemName: string,
        itemType: string,
        price: number,
        quantity: number,
        taxPerUnit: number,
        finalPricePerUnit: number,
        totalItemCost: number,
        totalTax: number,
        totalFinalPrice: number
    ): void {

        console.log(
            "\n----------------------------------------"
        );

        console.log(
            `Item Name          : ${itemName}`
        );

        console.log(
            `Item Price         : ₹${price.toFixed(2)}`
        );

        console.log(
            `Quantity           : ${quantity}`
        );

        console.log(
            `Item Type          : ${itemType}`
        );

        console.log(
            `Sales Tax / Unit   : ₹${taxPerUnit.toFixed(2)}`
        );

        console.log(
            `Final Price / Unit : ₹${finalPricePerUnit.toFixed(2)}`
        );

        console.log(
            `Total Item Cost    : ₹${totalItemCost.toFixed(2)}`
        );

        console.log(
            `Total Tax          : ₹${totalTax.toFixed(2)}`
        );

        console.log(
            `Total Final Price  : ₹${totalFinalPrice.toFixed(2)}`
        );

        console.log(
            "----------------------------------------"
        );
    }

    displayError(message: string): void {
        console.error(`\nError: ${message}`);
    }

    displayMessage(message: string): void {
        console.log(message);
    }

    close(): void {
        this.rl.close();
    }
}