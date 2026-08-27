import { RawItem } from "../src/models/RawItem";

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

});