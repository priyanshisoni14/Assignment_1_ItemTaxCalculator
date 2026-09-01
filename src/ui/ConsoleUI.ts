import * as readline from "readline";

import { Item } from "../models/Item";
import { ItemSummaryTotals } from "../utils/ItemSummaryCalculator";

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

    displayItemDetails(
        item: Item
    ): void {

        this.displayDetails(
            [
                {
                    ID: item.id,
                    ...item.getDisplayDetails()
                }
            ]
        );
    }

    displayItemSummary(
        items: Item[],
        totals: ItemSummaryTotals
    ): void {

        this.displayAllItemDetails(
            items
        );

        this.displaySummaryTotals(
            totals
        );
    }

    displayMessage(
        message: string
    ): void {

        console.log(message);
    }

    displayError(
        message: string
    ): void {

        console.error(
            `\nError: ${message}`
        );
    }

    close(): void {

        this.rl.close();
    }

    private displayAllItemDetails(
        items: Item[]
    ): void {

        const itemDetails =
            items.map((item) => ({
                ID: item.id,
                ...item.getDisplayDetails()
            }));

        this.displayDetails(
            itemDetails
        );
    }

    private displaySummaryTotals(
        totals: ItemSummaryTotals
    ): void {

        this.displayDetails(
            [
                {
                    "Total Item Cost":
                        totals.totalItemCost.toFixed(2),

                    "Total Tax":
                        totals.totalTax.toFixed(2),

                    "Total Final Price":
                        totals.totalFinalPrice.toFixed(2)
                }
            ]
        );
    }

    private displayDetails(
        details: Record<string, string | number>[]
    ): void {

        console.table(
            details
        );
    }
}