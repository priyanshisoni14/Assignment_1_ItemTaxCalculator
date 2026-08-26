"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    getItemCost() {
        return this.price * this.quantity;
    }
}
exports.Item = Item;
