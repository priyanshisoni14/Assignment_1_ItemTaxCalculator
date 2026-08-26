import { Item } from "../src/Item";

describe("Item", () => {

    test("should calculate total item cost using price × quantity", () => {
        const item = new Item(
            "Pen",
            100,
            3,
            "raw"
        );

        expect(item.getItemCost())
            .toBeCloseTo(300);
    });


    test("should calculate item cost correctly for decimal price", () => {
        const item = new Item(
            "Notebook",
            25.50,
            4,
            "raw"
        );

        expect(item.getItemCost())
            .toBeCloseTo(102);
    });
});