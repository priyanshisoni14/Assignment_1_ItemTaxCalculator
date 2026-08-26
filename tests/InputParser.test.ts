import { InputParser } from "../src/InputParser";

describe("InputParser", () => {

    const parser = new InputParser();


    describe("Valid input", () => {

        test("should parse valid item details", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-price",
                "100",
                "-quantity",
                "3",
                "-type",
                "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                quantity: 3,
                type: "raw"
            });
        });


        test("should accept options in different order", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-type",
                "raw",
                "-quantity",
                "3",
                "-price",
                "100"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                quantity: 3,
                type: "raw"
            });
        });


        test("should allow price and quantity to be omitted", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-type",
                "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: undefined,
                quantity: undefined,
                type: "raw"
            });
        });


        test("should accept item type irrespective of letter case", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-type",
                "RAW"
            ]);

            expect(result.type).toBe("raw");
        });
    });


    describe("Validation", () => {

        test("should reject missing item name", () => {

            expect(() => parser.parse([
                "-price",
                "100",
                "-type",
                "raw"
            ])).toThrow(
                "Item name (-name) is required."
            );
        });


        test("should reject missing item type", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-price",
                "100"
            ])).toThrow(
                "Item type (-type) is required."
            );
        });


        test("should reject invalid item type", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-type",
                "invalid"
            ])).toThrow(
                "Invalid item type"
            );
        });


        test("should reject non-numeric price", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-price",
                "abc",
                "-type",
                "raw"
            ])).toThrow(
                "Price must be a valid number."
            );
        });


        test("should reject negative price", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-price",
                "-100",
                "-type",
                "raw"
            ])).toThrow();
        });


        test("should reject non-numeric quantity", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-quantity",
                "abc",
                "-type",
                "raw"
            ])).toThrow(
                "Quantity must be a valid number."
            );
        });


        test("should reject zero quantity", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-quantity",
                "0",
                "-type",
                "raw"
            ])).toThrow(
                "Quantity must be greater than zero."
            );
        });


        test("should reject negative quantity", () => {

            expect(() => parser.parse([
                "-name",
                "Pen",
                "-quantity",
                "-2",
                "-type",
                "raw"
            ])).toThrow();
        });
    });
});