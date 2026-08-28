export class TaxUtils {

    private constructor() {}

    static calculateRawTax(price: number): number {
        return price * 0.125;
    }

    static calculateManufacturedTax(
        price: number
    ): number {

        const basicTax = price * 0.125;

        const additionalTax =
            (price + basicTax) * 0.02;

        return basicTax + additionalTax;
    }

    static calculateImportedTax(
        price: number
    ): number {

        const importDuty = price * 0.10;

        const costAfterImportDuty =
            price + importDuty;

        if (costAfterImportDuty <= 100) {
            return importDuty + 5;
        }

        if (costAfterImportDuty <= 200) {
            return importDuty + 10;
        }

        return (
            importDuty +
            costAfterImportDuty * 0.05
        );
    }
}