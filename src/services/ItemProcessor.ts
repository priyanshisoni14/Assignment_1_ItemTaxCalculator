import { Item } from "../models/Item";
import { InputParser } from "../InputParser";
import { ItemFactory } from "./ItemFactory";
import { ConsoleUI } from "../ui/ConsoleUI";

export class ItemProcessor {

    constructor(
        private readonly parser: InputParser,
        private readonly ui: ConsoleUI
    ) {}

    process(args: string[]): Item | null {

        try {
            const parsedInput = this.parser.parse(args);

            const item = ItemFactory.create(parsedInput);

            this.displayItemDetails(item);

            return item;

        } catch (error) {

            if (error instanceof Error) {
                this.ui.displayError(error.message);
            } else {
                this.ui.displayError(
                    "An unexpected error occurred."
                );
            }

            return null;
        }
    }

    private displayItemDetails(item: Item): void {

        this.ui.displayMessage(
            "\n----------------------------------------"
        );

        this.ui.displayMessage(
            `Item Name          : ${item.name}`
        );

        this.ui.displayMessage(
            `Item Price         : ₹${item.price.toFixed(2)}`
        );

        this.ui.displayMessage(
            `Quantity           : ${item.quantity}`
        );

        this.ui.displayMessage(
            `Item Type          : ${item.getType()}`
        );

        this.ui.displayMessage(
            `Sales Tax / Unit   : ₹${item.calculateTaxPerUnit().toFixed(2)}`
        );

        this.ui.displayMessage(
            `Final Price / Unit : ₹${item.calculateFinalPricePerUnit().toFixed(2)}`
        );

        this.ui.displayMessage(
            `Total Item Cost    : ₹${item.getItemCost().toFixed(2)}`
        );

        this.ui.displayMessage(
            `Total Tax          : ₹${item.calculateTotalTax().toFixed(2)}`
        );

        this.ui.displayMessage(
            `Total Final Price  : ₹${item.calculateTotalFinalPrice().toFixed(2)}`
        );

        this.ui.displayMessage(
            "----------------------------------------"
        );
    }
}