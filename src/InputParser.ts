import { ItemType } from "./models/ItemType";

export interface ParsedInput {
    name: string;
    price?: number;
    quantity?: number;
    type: ItemType;
}

interface OptionConfig {
    required: boolean;
    validate?: (value: string) => boolean;
    errorMessage?: string;
}

export class InputParser {

    private readonly options: Record<string, OptionConfig> = {

        "-name": {
            required: true
        },

        "-price": {
            required: false,
            validate: (value: string): boolean =>
                Number.isFinite(Number(value)) &&
                Number(value) >= 0,
            errorMessage: "Price must be a valid non-negative number."
        },

        "-quantity": {
            required: false,
            validate: (value: string): boolean =>
                Number.isFinite(Number(value)) &&
                Number(value) > 0 &&
                Number.isInteger(Number(value)),
            errorMessage: "Quantity must be a positive whole number."
        },

        "-type": {
            required: true,
            validate: (value: string): boolean =>
                ["raw", "manufactured", "imported"]
                    .includes(value.toLowerCase()),
            errorMessage:
                "Invalid item type. Valid types are raw, manufactured, imported."
        }
    };

    parse(args: string[]): ParsedInput {

        if (args.length === 0) {
            throw new Error(
                "Please provide item details."
            );
        }

        const input: Record<string, string> = {};

        for (let i = 0; i < args.length; i++) {

            const option = args[i];

            // Check that the option is supported.
            if (!this.options[option]) {
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

            // A value is missing if there is no next argument
            // or if the next argument is another option.
            if (
                value === undefined ||
                this.options[value] !== undefined
            ) {
                throw new Error(
                    `Value missing for ${option}.`
                );
            }

            // Trim the value once before storing it.
            const trimmedValue = value.trim();

            // Reject empty values.
            if (trimmedValue === "") {
                throw new Error(
                    `Value for ${option} cannot be empty.`
                );
            }

            input[option] = trimmedValue;

            i++;
        }

        this.validateRequiredOptions(input);

        this.validateValues(input);

        return this.createParsedInput(input);
    }

    private validateRequiredOptions(
        input: Record<string, string>
    ): void {

        if (input["-name"] === undefined) {
            throw new Error(
                "Item name (-name) is required."
            );
        }

        if (input["-type"] === undefined) {
            throw new Error(
                "Item type (-type) is required."
            );
        }
    }

    private validateValues(
        input: Record<string, string>
    ): void {

        // Validate price separately so the original
        // error messages remain clear.
        if (input["-price"] !== undefined) {

            const price = Number(input["-price"]);

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

        // Validate quantity separately so each
        // validation has its own meaningful error.
        if (input["-quantity"] !== undefined) {

            const quantity = Number(input["-quantity"]);

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

        // Validate item type.
        const type = input["-type"].toLowerCase();

        if (
            type !== "raw" &&
            type !== "manufactured" &&
            type !== "imported"
        ) {
            throw new Error(
                "Invalid item type. Valid types are raw, manufactured, imported."
            );
        }
    }

    private createParsedInput(
        input: Record<string, string>
    ): ParsedInput {

        const result: ParsedInput = {
            name: input["-name"],
            type: input["-type"].toLowerCase() as ItemType
        };

        if (input["-price"] !== undefined) {
            result.price = Number(input["-price"]);
        }

        if (input["-quantity"] !== undefined) {
            result.quantity = Number(input["-quantity"]);
        }

        return result;
    }
}