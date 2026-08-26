"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxCalculator = void 0;
class TaxCalculator {
    calculateTaxPerUnit(item) {
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
    calculateRawTax(price) {
        return price * 0.125;
    }
    calculateManufacturedTax(price) {
        const basicTax = price * 0.125;
        const additionalTax = (price + basicTax) * 0.02;
        return basicTax + additionalTax;
    }
    calculateImportedTax(price) {
        const importDuty = price * 0.10;
        const costAfterImportDuty = price + importDuty;
        let surcharge;
        if (costAfterImportDuty <= 100) {
            surcharge = 5;
        }
        else if (costAfterImportDuty <= 200) {
            surcharge = 10;
        }
        else {
            surcharge = costAfterImportDuty * 0.05;
        }
        return importDuty + surcharge;
    }
    calculateFinalPricePerUnit(item) {
        const tax = this.calculateTaxPerUnit(item);
        return item.price + tax;
    }
    calculateTotalTax(item) {
        const taxPerUnit = this.calculateTaxPerUnit(item);
        return taxPerUnit * item.quantity;
    }
    calculateTotalFinalPrice(item) {
        const finalPricePerUnit = this.calculateFinalPricePerUnit(item);
        return finalPricePerUnit * item.quantity;
    }
}
exports.TaxCalculator = TaxCalculator;
