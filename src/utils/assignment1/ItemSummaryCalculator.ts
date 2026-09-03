import { Item } from "../../models/assignment1/Item";

export interface ItemSummaryTotals {
  totalItemCost: number;
  totalTax: number;
  totalFinalPrice: number;
}

export class ItemSummaryCalculator {
  calculateTotals(items: Item[]): ItemSummaryTotals {
    const totalItemCost = items.reduce(
      (total, item) => total + item.getItemCost(),
      0,
    );

    const totalTax = items.reduce(
      (total, item) => total + item.calculateTotalTax(),
      0,
    );

    const totalFinalPrice = items.reduce(
      (total, item) => total + item.calculateTotalFinalPrice(),
      0,
    );

    return {
      totalItemCost,
      totalTax,
      totalFinalPrice,
    };
  }
}
