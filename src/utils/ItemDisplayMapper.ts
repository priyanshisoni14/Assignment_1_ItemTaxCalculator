import { Item }
    from "../models/assignment1/Item";

import { ItemSummaryTotals }
    from "./ItemSummaryCalculator";

export class ItemDisplayMapper {

    public mapItem(
        item: Item
    ): Record<string, string | number> {

        return {
            ID: item.id,
            ...item.getDisplayDetails()
        };
    }

    public mapItems(
        items: Item[]
    ): Record<string, string | number>[] {

        return items.map(
            item => this.mapItem(item)
        );
    }

    public mapSummary(
        totals: ItemSummaryTotals
    ): Record<string, string | number> {

        return {
            "Total Item Cost":
                totals.totalItemCost.toFixed(2),

            "Total Tax":
                totals.totalTax.toFixed(2),

            "Total Final Price":
                totals.totalFinalPrice.toFixed(2)
        };
    }
}