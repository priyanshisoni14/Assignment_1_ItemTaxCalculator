import { Item } from "./Item";
import { ItemType } from "./ItemType";

export class ImportedItem extends Item {

      calculateTaxPerUnit(): number {
         const importDuty = this.price * 0.10;

        const costAfterImportDuty =
            this.price + importDuty;

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

    getType(): ItemType {
        return "imported";
    }
}