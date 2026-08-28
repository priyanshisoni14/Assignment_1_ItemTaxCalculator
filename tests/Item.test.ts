import { RawItem } from "../src/models/RawItem";
import { ManufacturedItem } from "../src/models/ManufacturedItem";
import { ImportedItem } from "../src/models/ImportedItem";

describe("Item", () => {

    describe("Common item functionality", () => {

        it("should calculate total item cost", () => {

            const item = new RawItem(
                "Pen",
                100,
                3
            );

            expect(item.getItemCost()).toBe(300);
        });

        it("should calculate final price per unit", () => {

            const item = new RawItem(
                "Pen",
                100,
                3
            );

            expect(item.calculateFinalPricePerUnit())
                .toBe(112.5);
        });

        it("should calculate total tax", () => {

            const item = new RawItem(
                "Pen",
                100,
                3
            );

            expect(item.calculateTotalTax())
                .toBe(37.5);
        });

        it("should calculate total final price", () => {

            const item = new RawItem(
                "Pen",
                100,
                3
            );

            expect(item.calculateTotalFinalPrice())
                .toBe(337.5);
        });

    });

    describe("Item ID", () => {

        it("should assign a unique ID to each item", () => {

            const item1 = new RawItem(
                "Pen",
                100,
                1
            );

            const item2 = new RawItem(
                "Pen",
                100,
                1
            );

            expect(item1.id).not.toBe(item2.id);
        });

        it("should assign unique IDs across different item types", () => {

            const rawItem = new RawItem(
                "Pen",
                100,
                1
            );

            const manufacturedItem = new ManufacturedItem(
                "Machine",
                200,
                1
            );

            const importedItem = new ImportedItem(
                "Phone",
                300,
                1
            );

            const ids = [
                rawItem.id,
                manufacturedItem.id,
                importedItem.id
            ];

            expect(new Set(ids).size).toBe(3);
        });

    });

});