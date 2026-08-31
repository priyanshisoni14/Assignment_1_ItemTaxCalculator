import { Item } from "./Item";
import { ItemType } from "./ItemType";
import { TaxUtils } from "../utils/TaxUtils";

export class ImportedItem extends Item {

      calculateTaxPerUnit(): number {
        return TaxUtils.calculateImportedTax(
            this.price
        );
    }

    getType(): ItemType {
        return "imported";
    }
}