import { Item } from "../../models/assignment1/Item";
import { RawItem } from "../../models/assignment1/RawItem";
import { ManufacturedItem } from "../../models/assignment1/ManufacturedItem";
import { ImportedItem } from "../../models/assignment1/ImportedItem";
import { ParsedItemInput } from "../../models/assignment1/ParsedItemInput";

export class ItemFactory {
  static create(parsedInput: ParsedItemInput): Item {
    const price = parsedInput.price ?? 0;
    const quantity = parsedInput.quantity ?? 0;

    switch (parsedInput.type) {
      case "raw":
        return new RawItem(parsedInput.name, price, quantity);

      case "manufactured":
        return new ManufacturedItem(parsedInput.name, price, quantity);

      case "imported":
        return new ImportedItem(parsedInput.name, price, quantity);

      default:
        throw new Error("Invalid item type.");
    }
  }
}
