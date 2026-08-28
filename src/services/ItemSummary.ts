import { Item } from "../models/Item";

export class ItemSummary {

    static display(items: Item[]): void {

        console.log("\n==============================================================");
        console.log("                         ITEM SUMMARY");
        console.log("==============================================================");

        console.log(
            "ID | Name | Type | Price | Qty | Tax | Final Price"
        );

        console.log(
            "--------------------------------------------------------------"
        );

        for (const item of items) {

            console.log(
                `${item.id} | ` +
                `${item.name} | ` +
                `${item.getType()} | ` +
                `₹${item.price.toFixed(2)} | ` +
                `${item.quantity} | ` +
                `₹${item.calculateTotalTax().toFixed(2)} | ` +
                `₹${item.calculateTotalFinalPrice().toFixed(2)}`
            );
        }

        const totalItemCost = items.reduce(
            (total, item) =>
                total + item.getItemCost(),
            0
        );

        const totalTax = items.reduce(
            (total, item) =>
                total + item.calculateTotalTax(),
            0
        );

        const totalFinalPrice = items.reduce(
            (total, item) =>
                total + item.calculateTotalFinalPrice(),
            0
        );

        console.log(
            "--------------------------------------------------------------"
        );

        console.log(
            `Total Item Cost   : ₹${totalItemCost.toFixed(2)}`
        );

        console.log(
            `Total Tax         : ₹${totalTax.toFixed(2)}`
        );

        console.log(
            `Total Final Price : ₹${totalFinalPrice.toFixed(2)}`
        );

        console.log(
            "=============================================================="
        );
    }
}