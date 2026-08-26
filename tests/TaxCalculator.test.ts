import { Item } from "../src/Item";
import { TaxCalculator } from "../src/TaxCalculator";

describe("TaxCalculator", () => {

    const calculator = new TaxCalculator();

    describe("Raw item", () => {

        test("should calculate 12.5% tax per unit", () => {
            const item = new Item("Pen", 100, 3, "raw");

            expect(calculator.calculateTaxPerUnit(item))
                .toBeCloseTo(12.5);
        });

        test("should calculate total tax based on quantity", () => {
            const item = new Item("Pen", 100, 3, "raw");

            expect(calculator.calculateTotalTax(item))
                .toBeCloseTo(37.5);
        });
    });


    describe("Manufactured item", () => {

        test("should calculate manufactured item tax per unit", () => {
            const item = new Item(
                "Machine",
                100,
                2,
                "manufactured"
            );

            expect(calculator.calculateTaxPerUnit(item))
                .toBeCloseTo(14.75);
        });

        test("should calculate total manufactured item tax", () => {
            const item = new Item(
                "Machine",
                100,
                2,
                "manufactured"
            );

            expect(calculator.calculateTotalTax(item))
                .toBeCloseTo(29.5);
        });
    });


    describe("Imported item", () => {

        test("should calculate imported tax when cost after duty is <= 100", () => {
            const item = new Item(
                "Imported Pen",
                90,
                1,
                "imported"
            );

            // Import duty = 9
            // Cost after duty = 99
            // Surcharge = 5
            // Total tax = 14
            expect(calculator.calculateTaxPerUnit(item))
                .toBeCloseTo(14);
        });


        test("should calculate imported tax when cost after duty is between 100 and 200", () => {
            const item = new Item(
                "Imported Item",
                150,
                1,
                "imported"
            );

            // Import duty = 15
            // Cost after duty = 165
            // Surcharge = 10
            // Total tax = 25
            expect(calculator.calculateTaxPerUnit(item))
                .toBeCloseTo(25);
        });


        test("should calculate imported tax when cost after duty is greater than 200", () => {
            const item = new Item(
                "Imported Item",
                250,
                1,
                "imported"
            );

            // Import duty = 25
            // Cost after duty = 275
            // Surcharge = 13.75
            // Total tax = 38.75
            expect(calculator.calculateTaxPerUnit(item))
                .toBeCloseTo(38.75);
        });
    });


    describe("Final price", () => {

        test("should calculate final price per unit", () => {
            const item = new Item(
                "Pen",
                100,
                3,
                "raw"
            );

            expect(calculator.calculateFinalPricePerUnit(item))
                .toBeCloseTo(112.5);
        });


        test("should calculate total final price based on quantity", () => {
            const item = new Item(
                "Pen",
                100,
                3,
                "raw"
            );

            expect(calculator.calculateTotalFinalPrice(item))
                .toBeCloseTo(337.5);
        });
    });
});