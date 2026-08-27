import { ItemType } from "./ItemType";

export abstract class Item {
    constructor(
        public name: string,
        public price: number,
        public quantity: number
    ) {}

    getItemCost(): number {
        return this.price * this.quantity;
    }

    abstract calculateTaxPerUnit(): number;

    abstract getType(): ItemType;

    calculateFinalPricePerUnit(): number {
        return this.price + this.calculateTaxPerUnit();
    }

    calculateTotalTax(): number {
        return this.calculateTaxPerUnit() * this.quantity;
    }

    calculateTotalFinalPrice(): number {
        return this.calculateFinalPricePerUnit() * this.quantity;
    }
}