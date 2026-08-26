export type ItemType = "raw" | "manufactured" | "imported";

export class Item {
    constructor(
        public name: string,
        public price: number,
        public quantity: number,
        public type: ItemType
    ) {}

    getItemCost(): number {
        return this.price * this.quantity;
    }
}