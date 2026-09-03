export type Comparator<T> = (first: T, second: T) => number;

export class InsertionSorter {
 
  private static findInsertionIndex<T>(
    sortedItems: T[],
    item: T,
    comparator: Comparator<T>,
  ): number {
    let low = 0;
    let high = sortedItems.length;

    while (low < high) {
      const mid = (low + high) >>> 1;

      if (comparator(sortedItems[mid], item) <= 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }

  public static insertSorted<T>(
    sortedItems: T[],
    item: T,
    comparator: Comparator<T>,
  ): T[] {
    const insertIndex = InsertionSorter.findInsertionIndex(
      sortedItems,
      item,
      comparator,
    );

    const result = [...sortedItems];

    result.splice(insertIndex, 0, item);

    return result;
  }
}