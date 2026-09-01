import { InputParser } from "../src/parser/InputParser";
import { itemInputConfig } from "../src/config/ItemInputConfig";

describe("InputParser", () => {

    const parser =
        new InputParser(
            itemInputConfig
        );

    test(
        "should parse valid item details",
        () => {

            const result =
                parser.parse([
                    "-name",
                    "Pen",
                    "-price",
                    "100",
                    "-quantity",
                    "2",
                    "-type",
                    "raw"
                ]);

            expect(result).toEqual({
                "-name": "Pen",
                "-price": 100,
                "-quantity": 2,
                "-type": "raw"
            });
        }
    );

    test(
        "should accept options in any order",
        () => {

            const result =
                parser.parse([
                    "-type",
                    "manufactured",
                    "-name",
                    "Table",
                    "-quantity",
                    "3",
                    "-price",
                    "500"
                ]);

            expect(result).toEqual({
                "-type": "manufactured",
                "-name": "Table",
                "-quantity": 3,
                "-price": 500
            });
        }
    );

    test(
        "should allow optional price and quantity to be omitted",
        () => {

            const result =
                parser.parse([
                    "-name",
                    "Pen",
                    "-type",
                    "raw"
                ]);

            expect(result).toEqual({
                "-name": "Pen",
                "-type": "raw"
            });
        }
    );

    test(
        "should reject empty arguments",
        () => {

            expect(() =>
                parser.parse([])
            ).toThrow(
                "Please provide item details."
            );
        }
    );

    test(
        "should reject an unknown option",
        () => {

            expect(() =>
                parser.parse([
                    "-invalid",
                    "value"
                ])
            ).toThrow(
                "Unknown option: -invalid. Valid options are -name, -price, -quantity, -type."
            );
        }
    );

    test(
        "should reject duplicate options",
        () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-name",
                    "Book",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Duplicate option: -name."
            );
        }
    );

    test(
        "should reject a missing option value",
        () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Value missing for -name."
            );
        }
    );

    test(
        "should reject an empty option value",
        () => {

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
        }
    );

    test(
        "should reject missing name",
        () => {

            expect(() =>
                parser.parse([
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "-name is required."
            );
        }
    );

    test(
        "should reject missing type",
        () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen"
                ])
            ).toThrow(
                "-type is required."
            );
        }
    );

    test(
        "should reject an invalid price",
        () => {

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
        }
    );

    test(
        "should reject a negative price",
        () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-price",
                    "-10",
                    "-type",
                    "raw"
                ])
            ).toThrow(
                "Price cannot be negative."
            );
        }
    );

    test(
        "should reject an invalid quantity",
        () => {

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
        }
    );

    test(
        "should reject zero quantity",
        () => {

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
        }
    );

    test(
        "should reject a negative quantity",
        () => {

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
        }
    );

    test(
        "should reject a decimal quantity",
        () => {

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
        }
    );

    test(
        "should reject an invalid item type",
        () => {

            expect(() =>
                parser.parse([
                    "-name",
                    "Pen",
                    "-type",
                    "invalid"
                ])
            ).toThrow(
                "Invalid item type. Valid types are raw, manufactured, imported."
            );
        }
    );

    test(
        "should transform item type to lowercase",
        () => {

            const result =
                parser.parse([
                    "-name",
                    "Pen",
                    "-type",
                    "RAW"
                ]);

            expect(result).toEqual({
                "-name": "Pen",
                "-type": "raw"
            });
        }
    );
});