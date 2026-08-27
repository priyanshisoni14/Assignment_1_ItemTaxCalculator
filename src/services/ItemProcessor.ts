import { Item } from "../models/Item";
import { InputParser, ParsedInput } from "../InputParser";
import { ItemFactory } from "./ItemFactory";
import { ConsoleUI } from "../ui/ConsoleUI";

export class ItemProcessor {

    constructor(
        private readonly inputParser: InputParser,
        private readonly ui: ConsoleUI
    ) {}

    process(args: string[]): Item | null {

        try {

            const parsedInput: ParsedInput =
                this.inputParser.parse(args);

            const item =
                this.createItem(parsedInput);

            this.displayItem(item);

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

    private createItem(
        parsedInput: ParsedInput
    ): Item {

        return ItemFactory.create(
            parsedInput.name,
            parsedInput.price ?? 0,
            parsedInput.quantity ?? 0,
            parsedInput.type
        );
    }

    private displayItem(item: Item): void {

        this.ui.displayItemResult(
            item.name,
            item.getType(),
            item.price,
            item.quantity,
            item.calculateTaxPerUnit(),
            item.calculateFinalPricePerUnit(),
            item.getItemCost(),
            item.calculateTotalTax(),
            item.calculateTotalFinalPrice()
        );
    }
}