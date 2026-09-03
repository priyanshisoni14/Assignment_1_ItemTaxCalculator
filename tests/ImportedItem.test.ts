import { ImportedItem } from "../src/models/assignment1/ImportedItem";

describe("ImportedItem", () => {
  describe("Tax calculation", () => {
    it("should apply ₹5 surcharge when cost after import duty is ₹100 or less", () => {
      const item = new ImportedItem("Imported Pen", 90, 1);

      /*
       * Import duty = 90 × 10% = 9
       * Cost after duty = 99
       * Surcharge = 5
       * Total tax = 14
       */

      expect(item.calculateTaxPerUnit()).toBe(14);
    });

    it("should apply ₹10 surcharge when cost after import duty is between ₹100 and ₹200", () => {
      const item = new ImportedItem("Imported Item", 150, 1);

      /*
       * Import duty = 150 × 10% = 15
       * Cost after duty = 165
       * Surcharge = 10
       * Total tax = 25
       */

      expect(item.calculateTaxPerUnit()).toBe(25);
    });

    it("should apply 5% surcharge when cost after import duty is above ₹200", () => {
      const item = new ImportedItem("Imported Item", 250, 1);

      /*
       * Import duty = 250 × 10% = 25
       * Cost after duty = 275
       * Surcharge = 13.75
       * Total tax = 38.75
       */

      expect(item.calculateTaxPerUnit()).toBe(38.75);
    });

    it("should calculate total tax for multiple quantities", () => {
      const item = new ImportedItem("Imported Pen", 90, 3);

      expect(item.calculateTotalTax()).toBe(42);
    });
  });

  describe("Item type", () => {
    it("should return imported as the item type", () => {
      const item = new ImportedItem("Imported Pen", 90, 1);

      expect(item.getType()).toBe("imported");
    });
  });
});
