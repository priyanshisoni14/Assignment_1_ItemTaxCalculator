import { InputParser } from "../src/parser/InputParser";

describe("InputParser", () => {

    const parser = new InputParser();

    describe("Valid input", () => {

        it("should parse valid item details", () => {
            const result = parser.parse([
                "-name", "Pen",
                "-price", "100",
                "-quantity", "3",
                "-type", "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                quantity: 3,
                type: "raw"
            });
        });

        it("should accept different command-line option order", () => {
            const result = parser.parse([
                "-price", "100",
                "-type", "raw",
                "-quantity", "3",
                "-name", "Pen"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                quantity: 3,
                type: "raw"
            });
        });

        it("should accept optional price and quantity", () => {
            const result = parser.parse([
                "-name", "Pen",
                "-type", "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: undefined,
                quantity: undefined,
                type: "raw"
            });
        });

        it("should trim item name", () => {
            const result = parser.parse([
                "-name", "  Pen  ",
                "-type", "raw"
            ]);

            expect(result.name).toBe("Pen");
        });

    });

    describe("Validation", () => {

        it("should reject empty arguments", () => {
            expect(() => parser.parse([]))
                .toThrow("Please provide item details.");
        });

        it("should reject missing item name", () => {
            expect(() => parser.parse([
                "-price", "100",
                "-type", "raw"
            ])).toThrow("Item name (-name) is required.");
        });

        it("should reject missing item type", () => {
            expect(() => parser.parse([
                "-name", "Pen"
            ])).toThrow("Item type (-type) is required.");
        });

        it("should reject invalid item type", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-type", "invalid"
            ])).toThrow(
                "Invalid item type. Valid types are raw, manufactured, imported."
            );
        });

        it("should reject unknown options", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-invalid", "value",
                "-type", "raw"
            ])).toThrow(
                "Unknown option: -invalid."
            );
        });

        it("should reject duplicate options", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-name", "Pencil",
                "-type", "raw"
            ])).toThrow("Duplicate option: -name.");
        });

        it("should reject missing option value", () => {
            expect(() => parser.parse([
                "-name",
                "-type", "raw"
            ])).toThrow("Value missing for -name.");
        });

        it("should reject empty values", () => {
            expect(() => parser.parse([
                "-name", "   ",
                "-type", "raw"
            ])).toThrow("Value for -name cannot be empty.");
        });

        it("should reject invalid price", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-price", "abc",
                "-type", "raw"
            ])).toThrow("Price must be a valid number.");
        });

        it("should reject negative price", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-price", "-100",
                "-type", "raw"
            ])).toThrow("Price cannot be negative.");
        });

        it("should reject invalid quantity", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-quantity", "abc",
                "-type", "raw"
            ])).toThrow("Quantity must be a valid number.");
        });

        it("should reject zero quantity", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-quantity", "0",
                "-type", "raw"
            ])).toThrow("Quantity must be greater than zero.");
        });

        it("should reject decimal quantity", () => {
            expect(() => parser.parse([
                "-name", "Pen",
                "-quantity", "2.5",
                "-type", "raw"
            ])).toThrow("Quantity must be a whole number.");
        });

    });

});