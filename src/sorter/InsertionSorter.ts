export type Comparator<T> = (first: T, second: T) => number;

export class InsertionSorter {
  public static sort<T>(items: T[], comparator: Comparator<T>): T[] {
    const result = [...items];

    for (let currentIndex = 1; currentIndex < result.length; currentIndex++) {
      const currentItem = result[currentIndex];

      let compareIndex = currentIndex - 1;

      while (
        compareIndex >= 0 &&
        comparator(result[compareIndex], currentItem) > 0
      ) {
        result[compareIndex + 1] = result[compareIndex];

        compareIndex--;
      }

      result[compareIndex + 1] = currentItem;
    }

    return result;
  }

  public static insertSorted<T>(
    sortedItems: T[],
    item: T,
    comparator: Comparator<T>,
  ): T[] {
    const result = [...sortedItems];

    let insertIndex = result.length;

    result.push(item);

    while (insertIndex > 0 && comparator(result[insertIndex - 1], item) > 0) {
      result[insertIndex] = result[insertIndex - 1];

      insertIndex--;
    }

    result[insertIndex] = item;

    return result;
  }
}
