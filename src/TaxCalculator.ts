import { Item } from "./Item";

export class TaxCalculator {

    calculateTaxPerUnit(item: Item): number {
        switch (item.type) {
            case "raw":
                return this.calculateRawTax(item.price);

            case "manufactured":
                return this.calculateManufacturedTax(item.price);

            case "imported":
                return this.calculateImportedTax(item.price);

            default:
                throw new Error("Invalid item type.");
        }
    }

    private calculateRawTax(price: number): number {
        return price * 0.125;
    }

    private calculateManufacturedTax(price: number): number {
        const basicTax = price * 0.125;

        const additionalTax =
            (price + basicTax) * 0.02;

        return basicTax + additionalTax;
    }

    private calculateImportedTax(price: number): number {
        const importDuty = price * 0.10;

        const costAfterImportDuty =
            price + importDuty;

        let surcharge: number;

        if (costAfterImportDuty <= 100) {
            surcharge = 5;
        } else if (costAfterImportDuty <= 200) {
            surcharge = 10;
        } else {
            surcharge = costAfterImportDuty * 0.05;
        }

        return importDuty + surcharge;
    }

    calculateFinalPricePerUnit(item: Item): number {
        const tax = this.calculateTaxPerUnit(item);

        return item.price + tax;
    }

    calculateTotalTax(item: Item): number {
        const taxPerUnit = this.calculateTaxPerUnit(item);

        return taxPerUnit * item.quantity;
    }

    calculateTotalFinalPrice(item: Item): number {
        const finalPricePerUnit =
            this.calculateFinalPricePerUnit(item);

        return finalPricePerUnit * item.quantity;
    }
}