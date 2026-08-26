"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputParser = void 0;
class InputParser {
    parse(args) {
        const input = {};
        for (let i = 0; i < args.length; i++) {
            const option = args[i];
            if (!option.startsWith("-")) {
                throw new Error(`Invalid option: ${option}`);
            }
            const value = args[i + 1];
            if (!value || value.startsWith("-")) {
                throw new Error(`Value missing for ${option}`);
            }
            input[option] = value;
            i++;
        }
        // Required option: name
        if (!input["-name"]) {
            throw new Error("Item name (-name) is required.");
        }
        // Required option: type
        if (!input["-type"]) {
            throw new Error("Item type (-type) is required.");
        }
        const type = input["-type"].toLowerCase();
        if (type !== "raw" &&
            type !== "manufactured" &&
            type !== "imported") {
            throw new Error("Invalid item type. Valid types are raw, manufactured, imported.");
        }
        let price;
        if (input["-price"] !== undefined) {
            price = Number(input["-price"]);
            if (Number.isNaN(price)) {
                throw new Error("Price must be a valid number.");
            }
            if (price < 0) {
                throw new Error("Price cannot be negative.");
            }
        }
        let quantity;
        if (input["-quantity"] !== undefined) {
            quantity = Number(input["-quantity"]);
            if (Number.isNaN(quantity)) {
                throw new Error("Quantity must be a valid number.");
            }
            if (quantity <= 0) {
                throw new Error("Quantity must be greater than zero.");
            }
        }
        return {
            name: input["-name"],
            price,
            quantity,
            type
        };
    }
}
exports.InputParser = InputParser;
