import { Item } from "../models/Item";
import { RawItem } from "../models/RawItem";
import { ManufacturedItem } from "../models/ManufacturedItem";
import { ImportedItem } from "../models/ImportedItem";
import { ParsedItemInput } from "../models/ParsedItemInput";

export class ItemFactory {

    static create(parsedInput: ParsedItemInput): Item {

        const price = parsedInput.price ?? 0;
        const quantity = parsedInput.quantity ?? 0;

        switch (parsedInput.type) {

            case "raw":
                return new RawItem(
                    parsedInput.name,
                    price,
                    quantity
                );

            case "manufactured":
                return new ManufacturedItem(
                    parsedInput.name,
                    price,
                    quantity
                );

            case "imported":
                return new ImportedItem(
                    parsedInput.name,
                    price,
                    quantity
                );

            default:
                throw new Error(
                    "Invalid item type."
                );
        }
    }
}