import { Item } from "../models/Item";
import { InputParser } from "../parser/InputParser";
import { ItemProcessor } from "../processor/ItemProcessor";
import { ConsoleUI } from "../ui/ConsoleUI";
import { ItemInputMapper } from "../utils/ItemInputMapper";
import { ItemSummaryCalculator } from "../utils/ItemSummaryCalculator";
import { itemInputConfig } from "../config/ItemInputConfig";

export class Application {

    private readonly ui: ConsoleUI;
    private readonly processor: ItemProcessor;
    private readonly summaryCalculator:
        ItemSummaryCalculator;

    constructor(
        ui: ConsoleUI = new ConsoleUI()
    ) {

        this.ui = ui;

        this.processor =
            new ItemProcessor(
                new InputParser(
                    itemInputConfig
                ),
                new ItemInputMapper(),
                this.ui
            );

        this.summaryCalculator =
            new ItemSummaryCalculator();
    }

    async run(): Promise<void> {

        const items =
            this.processFirstItem();

        if (items === null) {
            return;
        }

        await this.collectAdditionalItems(
            items
        );

        this.displayItemSummary(
            items
        );

        this.terminateApplication();
    }

    private processFirstItem():
        Item[] | null {

        const commandLineArguments =
            process.argv.slice(2);

        if (commandLineArguments.length === 0) {

            this.ui.displayError(
                "Please provide item details."
            );

            this.ui.close();

            return null;
        }

        const item =
            this.processor.process(
                commandLineArguments
            );

        return item
            ? [item]
            : [];
    }

    private async collectAdditionalItems(
        items: Item[]
    ): Promise<void> {

        while (true) {

            const answer =
                await this.askToAddAnotherItem();

            if (answer === "n") {
                return;
            }

            if (answer === "y") {

                await this.collectAdditionalItem(
                    items
                );

                continue;
            }

            this.ui.displayMessage(
                "Invalid input. Please enter y or n."
            );
        }
    }

    private async askToAddAnotherItem():
        Promise<string> {

        return (
            await this.ui.askQuestion(
                "\nDo you want to enter details of any other item (y/n): "
            )
        )
            .trim()
            .toLowerCase();
    }

    private async collectAdditionalItem(
        items: Item[]
    ): Promise<void> {

        const itemDetails =
            await this.ui.askQuestion(
                "Enter item details: "
            );

        const itemArguments =
            itemDetails
                .trim()
                .split(/\s+/);

        const item =
            this.processor.process(
                itemArguments
            );

        if (item) {
            items.push(item);
        }
    }

    private displayItemSummary(
        items: Item[]
    ): void {

        const totals =
            this.summaryCalculator
                .calculateTotals(items);

        this.ui.displayItemSummary(
            items,
            totals
        );
    }

    private terminateApplication():
        void {

        this.ui.displayMessage(
            "\nApplication terminated."
        );

        this.ui.close();
    }
}