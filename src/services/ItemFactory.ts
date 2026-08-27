import { Item } from "../models/Item";
import { ItemType } from "../models/ItemType";
import { RawItem } from "../models/RawItem";
import { ManufacturedItem } from "../models/ManufacturedItem";
import { ImportedItem } from "../models/ImportedItem";

export class ItemFactory {

    static create(
        name: string,
        price: number,
        quantity: number,
        type: ItemType
    ): Item {

        switch (type) {

            case "raw":
                return new RawItem(
                    name,
                    price,
                    quantity
                );

            case "manufactured":
                return new ManufacturedItem(
                    name,
                    price,
                    quantity
                );

            case "imported":
                return new ImportedItem(
                    name,
                    price,
                    quantity
                );

            default:
                throw new Error(
                    `Invalid item type: ${type}`
                );
        }
    }
}