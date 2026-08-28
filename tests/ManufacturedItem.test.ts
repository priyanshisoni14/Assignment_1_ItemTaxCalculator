import { ManufacturedItem } from "../src/models/ManufacturedItem";

describe("ManufacturedItem", () => {

    describe("Tax calculation", () => {

        it("should calculate basic tax plus additional tax", () => {

            const item = new ManufacturedItem(
                "Machine",
                100,
                1
            );

            expect(item.calculateTaxPerUnit())
                .toBe(14.75);
        });

        it("should calculate total tax for multiple quantities", () => {

            const item = new ManufacturedItem(
                "Machine",
                100,
                3
            );

            expect(item.calculateTotalTax())
                .toBe(44.25);
        });

    });

    describe("Item type", () => {

        it("should return manufactured as the item type", () => {

            const item = new ManufacturedItem(
                "Machine",
                100,
                1
            );

            expect(item.getType())
                .toBe("manufactured");
        });

    });

});