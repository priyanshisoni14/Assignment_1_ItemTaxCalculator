import { Item } from "../models/Item";
import { InputParser } from "../InputParser";
import { ItemProcessor } from "./ItemProcessor";
import { ItemSummary } from "./ItemSummary";
import { ConsoleUI } from "../ui/ConsoleUI";

export class Application {

    private readonly ui: ConsoleUI;
    private readonly processor: ItemProcessor;

    constructor() {
        this.ui = new ConsoleUI();

        const parser = new InputParser();

        this.processor = new ItemProcessor(
            parser,
            this.ui
        );
    }

    async run(): Promise<void> {

        const items = this.processCommandLineItem();

        if (!items) {
            return;
        }

        await this.collectAdditionalItems(items);

        ItemSummary.display(items);

        this.ui.displayMessage(
            "\nApplication terminated."
        );

        this.ui.close();
    }

    private processCommandLineItem(): Item[] | null {

        const args = process.argv.slice(2);

        if (args.length === 0) {
            this.ui.displayError(
                "Please provide item details."
            );

            this.ui.close();

            return null;
        }

        const item = this.processor.process(args);

        return item ? [item] : [];
    }

    private async collectAdditionalItems(
        items: Item[]
    ): Promise<void> {

        while (true) {

            const answer = (
                await this.ui.askQuestion(
                    "\nDo you want to enter details of any other item (y/n): "
                )
            ).trim().toLowerCase();

            if (answer === "n") {
                return;
            }

            if (answer !== "y") {
                this.ui.displayMessage(
                    "Invalid input. Please enter y or n."
                );
                continue;
            }

            await this.processAdditionalItem(items);
        }
    }

    private async processAdditionalItem(
        items: Item[]
    ): Promise<void> {

        const input = await this.ui.askQuestion(
            "Enter item details: "
        );

        const args = input.trim().split(/\s+/);

        const item = this.processor.process(args);

        if (item) {
            items.push(item);
        }
    }
}