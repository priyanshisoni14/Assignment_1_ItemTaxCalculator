import { Item } from "../models/Item";
import { InputParser } from "../parser/InputParser";
import { ItemProcessor } from "../processor/ItemProcessor";

import { ConsoleUI } from "../ui/ConsoleUI";

export class Application {

    private readonly ui: ConsoleUI;
    private readonly processor: ItemProcessor;

    constructor(ui: ConsoleUI = new ConsoleUI()) {
        this.ui = ui;

        this.processor = new ItemProcessor(
            new InputParser(),
            this.ui
        );
    }

    async run(): Promise<void> {

        const items = this.processFirstItem();

        if (items === null) {
            return;
        }

        await this.collectAdditionalItems(items);

       

        this.ui.displayMessage(
            "\nApplication terminated."
        );

        this.ui.close();
    }

    private processFirstItem(): Item[] | null {

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
            )
                .trim()
                .toLowerCase();

            if (answer === "n") {
                return;
            }

            if (answer === "y") {
                await this.addItem(items);
                continue;
            }

            this.ui.displayMessage(
                "Invalid input. Please enter y or n."
            );
        }
    }

    private async addItem(items: Item[]): Promise<void> {

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