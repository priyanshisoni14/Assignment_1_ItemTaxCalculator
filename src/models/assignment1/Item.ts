import { ItemType } from "./ItemType";

export abstract class Item {

    private static nextId = 1;

    public readonly id: number;

    constructor(
        public name: string,
        public price: number,
        public quantity: number
    ) {
        this.id = Item.nextId++;
    }

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

    getDisplayDetails(): Record<string, string | number> {

        return {
            Name: this.name,
            Type: this.getType(),
            Price: this.price,
            Quantity: this.quantity,
            "Tax Per Unit":
                this.calculateTaxPerUnit(),
            "Total Tax":
                this.calculateTotalTax(),
            "Final Price Per Unit":
                this.calculateFinalPricePerUnit(),
            "Total Final Price":
                this.calculateTotalFinalPrice()
        };
    }
}