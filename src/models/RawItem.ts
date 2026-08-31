import { Item } from "./Item";
import { ItemType } from "./ItemType";
import { TaxUtils } from "../utils/TaxUtils";

export class RawItem extends Item {

    calculateTaxPerUnit(): number {
        return TaxUtils.calculateRawTax(
            this.price
        );
    }

    getType(): ItemType {
        return "raw";
    }
}