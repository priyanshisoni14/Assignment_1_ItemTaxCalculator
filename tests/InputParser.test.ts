import { InputParser } from "../src/InputParser";

describe("InputParser", () => {

    let parser: InputParser;

    beforeEach(() => {
        parser = new InputParser();
    });

    describe("Valid input", () => {

        it("should parse a valid raw item", () => {

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

        it("should accept different command-line option order", () => {

            const result = parser.parse([
                "-type",
                "raw",
                "-quantity",
                "3",
                "-price",
                "100",
                "-name",
                "Pen"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                quantity: 3,
                type: "raw"
            });
        });

        it("should accept uppercase item type", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-price",
                "100",
                "-quantity",
                "2",
                "-type",
                "RAW"
            ]);

            expect(result.type)
                .toBe("raw");
        });

        it("should trim whitespace from item name", () => {

            const result = parser.parse([
                "-name",
                "  Pen  ",
                "-price",
                "100",
                "-quantity",
                "2",
                "-type",
                "raw"
            ]);

            expect(result.name)
                .toBe("Pen");
        });

        it("should allow price to be omitted", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-quantity",
                "2",
                "-type",
                "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                quantity: 2,
                type: "raw"
            });
        });

        it("should allow quantity to be omitted", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-price",
                "100",
                "-type",
                "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                price: 100,
                type: "raw"
            });
        });

        it("should allow both price and quantity to be omitted", () => {

            const result = parser.parse([
                "-name",
                "Pen",
                "-type",
                "raw"
            ]);

            expect(result).toEqual({
                name: "Pen",
                type: "raw"
            });
        });

    });

    describe("Validation", () => {

        it("should reject empty input", () => {

            expect(() =>
                parser.parse([])
            ).toThrow(
                "Please provide item details."
            );
        });

        it("should reject missing item name", () => {

            expect(() =>
                parser.parse([
                    "-price",
                    "100",
                    "-quantity",
                    "2",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Item name (-name) is required."
            );
        });

        it("should reject missing item type", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-price",
                    "100"
                ])
            ).toThrow(
                "Item type (-type) is required."
            );
        });

        it("should reject invalid item type", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-type",
                    "invalid"
                ])
            ).toThrow(
                "Invalid item type."
            );
        });

        it("should reject unknown option", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-color",
                    "red",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Unknown option: -color."
            );
        });

        it("should reject duplicate options", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-name",
                    "Pencil",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Duplicate option: -name."
            );
        });

        it("should reject missing option value", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-type"
                ])
            ).toThrow(
                "Value missing for -type."
            );
        });

        it("should reject empty option value", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "   ",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Value for -name cannot be empty."
            );
        });

        it("should reject invalid price", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-price",
                    "abc",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Price must be a valid number."
            );
        });

        it("should reject negative price", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-price",
                    "-100",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Price cannot be negative."
            );
        });

        it("should reject invalid quantity", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-quantity",
                    "abc",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Quantity must be a valid number."
            );
        });

        it("should reject zero quantity", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-quantity",
                    "0",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Quantity must be greater than zero."
            );
        });

        it("should reject negative quantity", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-quantity",
                    "-2",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Quantity must be greater than zero."
            );
        });

        it("should reject decimal quantity", () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-quantity",
                    "2.5",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Quantity must be a whole number."
            );
        });

    });

});