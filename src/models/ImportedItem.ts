import { Item } from "./Item";
import { ItemType } from "./ItemType";

export class ImportedItem extends Item {

    calculateTaxPerUnit(): number {

        const importDuty = this.price * 0.10;

        const costAfterImportDuty =
            this.price + importDuty;

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

    getType(): ItemType {
        return "imported";
    }
}