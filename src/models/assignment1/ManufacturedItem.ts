import { Item } from "./Item";
import { ItemType } from "./ItemType";

export class ManufacturedItem extends Item {
  calculateTaxPerUnit(): number {
    const basicTax = this.price * 0.125;

    const additionalTax = (this.price + basicTax) * 0.02;

    return basicTax + additionalTax;
  }

  getType(): ItemType {
    return "manufactured";
  }
}
