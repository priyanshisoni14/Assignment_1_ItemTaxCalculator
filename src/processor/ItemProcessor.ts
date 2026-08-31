import { Item } from "../models/Item";
import { InputParser } from "../parser/InputParser";
import { ItemFactory } from "../factory/ItemFactory";
import { ItemInputMapper } from "../utils/ItemInputMapper";
import { ConsoleUI } from "../ui/ConsoleUI";

export class ItemProcessor {

    constructor(
        private readonly parser: InputParser,
        private readonly mapper: ItemInputMapper,
        private readonly ui: ConsoleUI
    ) {}

    process(
        args: string[]
    ): Item | null {

        try {

            const input =
                this.parser.parse(args);

            const parsedInput =
                this.mapper.map(input);

            const item =
                ItemFactory.create(parsedInput);

            this.ui.displayItemDetails(
                item
            );

            return item;

        } catch (error) {

            this.displayProcessingError(
                error
            );

            return null;
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
}