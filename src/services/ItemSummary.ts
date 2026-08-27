import { Item } from "../models/Item";

export class ItemSummary {

    static display(items: Item[]): void {

        let totalItemCost = 0;
        let totalTax = 0;
        let totalFinalPrice = 0;

        console.log("\n========================================");
        console.log("                 SUMMARY");
        console.log("========================================");

        console.log(
            "\nItem Name\tType\tQuantity\tPrice\tTax\tFinal Price"
        );

        console.log(
            "--------------------------------------------------------------------------"
        );

        items.forEach((item) => {

            const itemCost =
                item.getItemCost();

            const tax =
                item.calculateTotalTax();

            const finalPrice =
                item.calculateTotalFinalPrice();

            console.log(
                `${item.name}\t${item.getType()}\t${item.quantity}\t\t₹${item.price.toFixed(2)}\t₹${tax.toFixed(2)}\t₹${finalPrice.toFixed(2)}`
            );

            totalItemCost += itemCost;
            totalTax += tax;
            totalFinalPrice += finalPrice;
        });

        console.log(
            "--------------------------------------------------------------------------"
        );

        console.log(
            `Overall Total Item Cost : ₹${totalItemCost.toFixed(2)}`
        );

        console.log(
            `Overall Total Tax       : ₹${totalTax.toFixed(2)}`
        );

        console.log(
            `Overall Total Price     : ₹${totalFinalPrice.toFixed(2)}`
        );

        console.log("========================================");
    }
}