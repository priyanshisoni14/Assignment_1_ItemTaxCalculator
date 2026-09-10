import { ItemFactory } from "../src/factory/ItemFactory";
import { RawItem } from "../src/models/RawItem";
import { ManufacturedItem } from "../src/models/ManufacturedItem";
import { ImportedItem } from "../src/models/ImportedItem";

describe("ItemFactory", () => {

    it("should create a RawItem", () => {

        const item = ItemFactory.create({
            name: "Pen",
            price: 100,
            quantity: 2,
            type: "raw"
        });

        expect(item).toBeInstanceOf(RawItem);
    });

    it("should create a ManufacturedItem", () => {

        const item = ItemFactory.create({
            name: "Machine",
            price: 100,
            quantity: 2,
            type: "manufactured"
        });

        expect(item).toBeInstanceOf(
            ManufacturedItem
        );
    });

    it("should create an ImportedItem", () => {

        const item = ItemFactory.create({
            name: "Phone",
            price: 100,
            quantity: 2,
            type: "imported"
        });

        expect(item).toBeInstanceOf(
            ImportedItem
        );
    });

    it("should use zero when price is missing", () => {

        const item = ItemFactory.create({
            name: "Pen",
            quantity: 2,
            type: "raw"
        });

        expect(item.price).toBe(0);
    });

    it("should use zero when quantity is missing", () => {

        const item = ItemFactory.create({
            name: "Pen",
            price: 100,
            type: "raw"
        });

        expect(item.quantity).toBe(0);
    });
});