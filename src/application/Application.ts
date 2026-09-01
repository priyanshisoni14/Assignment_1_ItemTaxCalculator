import { itemInputConfig } from "../config/ItemInputConfig";
import { Item } from "../models/Item";
import { InputParser } from "../parser/InputParser";
import { ItemProcessor } from "../processor/ItemProcessor";
import { ConsoleUI } from "../ui/ConsoleUI";
import { ItemInputMapper } from "../utils/ItemInputMapper";
import { ItemSummaryCalculator } from "../utils/ItemSummaryCalculator";

export class Application {

    private static instance: Application;

    private readonly ui: ConsoleUI;
    private readonly processor: ItemProcessor;
    private readonly summaryCalculator:
        ItemSummaryCalculator;

    private constructor() {

        this.ui =
            new ConsoleUI();

        this.processor =
            new ItemProcessor(
                new InputParser(
                    itemInputConfig
                ),
                new ItemInputMapper()
            );

        this.summaryCalculator =
            new ItemSummaryCalculator();
    }

    public static getInstance(): Application {

        if (
            Application.instance === undefined
        ) {
            Application.instance =
                new Application();
        }

        return Application.instance;
    }

    async run(): Promise<void> {

        // Process the first item provided
        // through command-line arguments.
        const items =
            this.processFirstItem();

        if (items === null) {
            return;
        }

        // Continue asking for another item
        // until the user chooses to stop.
        let shouldCollectAnotherItem =
            true;

        while (shouldCollectAnotherItem) {

            const answer =
                await this.askToAddAnotherItem();

            // Collect and handle another item
            // when the user chooses yes.
            if (answer === "y") {

                await this.collectAdditionalItem(
                    items
                );

                continue;
            }

            // Stop collecting items when
            // the user chooses no.
            if (answer === "n") {

                shouldCollectAnotherItem =
                    false;

                continue;
            }

            // Ask again when the user provides
            // an invalid response.
            this.ui.displayMessage(
                "Invalid input. Please enter y or n."
            );
        }

        // Display the combined summary
        // after all items are collected.
        this.displayItemSummary(
            items
        );

        this.terminateApplication();
    }

    private processFirstItem():
        Item[] | null {

        const commandLineArguments =
            process.argv.slice(2);

        if (
            commandLineArguments.length === 0
        ) {
            this.ui.displayError(
                "Please provide item details."
            );

            this.ui.close();

            return null;
        }

        const items: Item[] = [];

        this.handleItem(
            commandLineArguments,
            items
        );

        return items;
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

        this.handleItem(
            itemArguments,
            items
        );
    }

    // Processes the item input, adds the created item
    // to the collection, and displays its details.
    private handleItem(
        itemArguments: string[],
        items: Item[]
    ): void {

        try {

            const item =
                this.processor.process(
                    itemArguments
                );

            items.push(item);

            this.ui.displayItemDetails(
                item
            );

        } catch (error) {

            this.displayProcessingError(
                error
            );
        }
    }

    private displayProcessingError(
        error: unknown
    ): void {

        if (error instanceof Error) {

            this.ui.displayError(
                error.message
            );

            return;
        }

        this.ui.displayError(
            "An unexpected error occurred."
        );
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