import { itemInputConfig } from "../../config/assignment1/ItemInputConfig";
import { Item } from "../../models/assignment1/Item";
import { InputParser } from "../../parser/InputParser";
import { ItemProcessor } from "../../processor/ItemProcessor";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { ItemInputMapper } from "../../utils/assignment1/ItemInputMapper";
import { ItemSummaryCalculator } from "../../utils/assignment1/ItemSummaryCalculator";
import { ItemDisplayMapper } from "../../utils/assignment1/ItemDisplayMapper";

export class Application {
  private static instance: Application;

  private readonly processor: ItemProcessor;
  private readonly summaryCalculator: ItemSummaryCalculator;
  private readonly itemDisplayMapper: ItemDisplayMapper;
  private hasConsumedCliArgs = false;

  private constructor() {
    this.processor = new ItemProcessor(
      new InputParser(itemInputConfig),
      new ItemInputMapper(),
    );

    this.summaryCalculator = new ItemSummaryCalculator();

    this.itemDisplayMapper = new ItemDisplayMapper();
  }

  public static getInstance(): Application {
    if (Application.instance === undefined) {
      Application.instance = new Application();
    }

    return Application.instance;
  }

  public async run(): Promise<void> {
    const items = await this.processFirstItem();

    if (items === null) {
      return;
    }

    let shouldCollectAnotherItem = true;

    while (shouldCollectAnotherItem) {
      const answer = await this.askToAddAnotherItem();

      if (answer === "y") {
        await this.collectAdditionalItem(items);

        continue;
      }

      if (answer === "n") {
        shouldCollectAnotherItem = false;

        continue;
      }

      ConsoleUI.displayMessage("Invalid input. Please enter y or n.");
    }

    this.displayItemSummary(items);

    ConsoleUI.displayMessage("\nItem Tax Calculator completed.");
  }

  private async processFirstItem(): Promise<Item[] | null> {
    const items: Item[] = [];

    if (!this.hasConsumedCliArgs) {
      this.hasConsumedCliArgs = true;

      const commandLineArguments = process.argv.slice(2);

      if (commandLineArguments.length > 0) {
        this.handleItem(commandLineArguments, items);

        return items;
      }
    }

    const itemDetails = await ConsoleUI.askQuestion("\nEnter item details: ");

    if (itemDetails.trim().length === 0) {
      ConsoleUI.displayError("Please provide item details.");

      return null;
    }

    this.handleItem(itemDetails.trim().split(/\s+/), items);

    return items;
  }

  private async askToAddAnotherItem(): Promise<string> {
    return (
      await ConsoleUI.askQuestion(
        "\nDo you want to enter details of any other item (y/n): ",
      )
    )
      .trim()
      .toLowerCase();
  }

  private async collectAdditionalItem(items: Item[]): Promise<void> {
    const itemDetails = await ConsoleUI.askQuestion("Enter item details: ");

    const itemArguments = itemDetails.trim().split(/\s+/);

    this.handleItem(itemArguments, items);
  }

  private handleItem(itemArguments: string[], items: Item[]): void {
    try {
      const item = this.processor.process(itemArguments);

      items.push(item);

      ConsoleUI.displayTable([this.itemDisplayMapper.mapItem(item)]);
    } catch (error) {
      this.displayProcessingError(error);
    }
  }

  private displayProcessingError(error: unknown): void {
    ConsoleUI.displayCaughtError("Application.handleItem", error, "An unexpected error occurred.");
  }

  private displayItemSummary(items: Item[]): void {
    const totals = this.summaryCalculator.calculateTotals(items);

    ConsoleUI.displayTable(this.itemDisplayMapper.mapItems(items));

    ConsoleUI.displayTable([this.itemDisplayMapper.mapSummary(totals)]);
  }
}