import { Item } from "./Item";
import { ItemType } from "./ItemType";

export class RawItem extends Item {
  calculateTaxPerUnit(): number {
    return this.price * 0.125;
  }

  getType(): ItemType {
    return "raw";
  }
}
