import { RawItem } from "../src/models/RawItem";

describe("RawItem", () => {

    describe("Tax calculation", () => {

        it("should calculate 12.5% tax", () => {

            const item = new RawItem(
                "Pen",
                100,
                1
            );

            expect(item.calculateTaxPerUnit())
                .toBe(12.5);
        });

        it("should calculate tax correctly for different prices", () => {

            const item = new RawItem(
                "Notebook",
                200,
                2
            );

            expect(item.calculateTaxPerUnit())
                .toBe(25);
        });

    });

    describe("Item type", () => {

        it("should return raw as the item type", () => {

            const item = new RawItem(
                "Pen",
                100,
                1
            );

            expect(item.getType())
                .toBe("raw");
        });

    });

});