import { ItemType } from "./Item";

export interface ParsedInput {
    name: string;
    price?: number;
    quantity?: number;
    type: ItemType;
}

export class InputParser {

    private readonly validOptions = new Set([
        "-name",
        "-price",
        "-quantity",
        "-type"
    ]);

    parse(args: string[]): ParsedInput {

        // At least one option must be provided.
        if (args.length === 0) {
            throw new Error(
                "Please provide item details."
            );
        }

        // -name must always be the first option.
        if (args[0] !== "-name") {
            throw new Error(
                "The first option must be -name."
            );
        }

        const input: Record<string, string> = {};

        for (let i = 0; i < args.length; i++) {

            const option = args[i];

            // Check whether the option is supported.
            if (!this.validOptions.has(option)) {
                throw new Error(
                    `Unknown option: ${option}. Valid options are -name, -price, -quantity, -type.`
                );
            }

            // Check for duplicate options.
            if (input[option] !== undefined) {
                throw new Error(
                    `Duplicate option: ${option}.`
                );
            }

            const value = args[i + 1];

            // Check whether a value was provided.
            if (value === undefined) {
                throw new Error(
                    `Value missing for ${option}.`
                );
            }

            // Check for empty value.
            if (value.trim() === "") {
                throw new Error(
                    `Value for ${option} cannot be empty.`
                );
            }

            input[option] = value;

            i++;
        }

        // Name is mandatory.
        if (!input["-name"]) {
            throw new Error(
                "Item name (-name) is required."
            );
        }

        // Name cannot be empty or whitespace.
        if (input["-name"].trim() === "") {
            throw new Error(
                "Item name cannot be empty."
            );
        }

        // Type is mandatory.
        if (!input["-type"]) {
            throw new Error(
                "Item type (-type) is required."
            );
        }

        // Convert type to lowercase so Raw, RAW, etc. are accepted.
        const type = input["-type"].toLowerCase();

        // Validate item type.
        if (
            type !== "raw" &&
            type !== "manufactured" &&
            type !== "imported"
        ) {
            throw new Error(
                "Invalid item type. Valid types are raw, manufactured, imported."
            );
        }

        let price: number | undefined;

        // Price is optional.
        if (input["-price"] !== undefined) {

            price = Number(input["-price"]);

            if (!Number.isFinite(price)) {
                throw new Error(
                    "Price must be a valid number."
                );
            }

            if (price < 0) {
                throw new Error(
                    "Price cannot be negative."
                );
            }
        }

        let quantity: number | undefined;

        // Quantity is optional.
        if (input["-quantity"] !== undefined) {

            quantity = Number(input["-quantity"]);

            if (!Number.isFinite(quantity)) {
                throw new Error(
                    "Quantity must be a valid number."
                );
            }

            if (quantity <= 0) {
                throw new Error(
                    "Quantity must be greater than zero."
                );
            }

            if (!Number.isInteger(quantity)) {
                throw new Error(
                    "Quantity must be a whole number."
                );
            }
        }

        return {
            name: input["-name"].trim(),
            price,
            quantity,
            type
        };
    }
}