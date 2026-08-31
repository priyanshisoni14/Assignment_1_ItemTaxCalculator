import { Item } from "./Item";
import { ItemType } from "./ItemType";
import { TaxUtils } from "../utils/TaxUtils";
   
export class ManufacturedItem extends Item {

   calculateTaxPerUnit(): number {
        return TaxUtils.calculateManufacturedTax(
            this.price
        );
    }

    getType(): ItemType {
        return "manufactured";
    }
}