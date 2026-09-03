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

  private constructor(private readonly ui: ConsoleUI) {
    this.processor = new ItemProcessor(
      new InputParser(itemInputConfig),
      new ItemInputMapper(),
    );

    this.summaryCalculator = new ItemSummaryCalculator();

    this.itemDisplayMapper = new ItemDisplayMapper();
  }

  public static getInstance(ui: ConsoleUI): Application {
    if (Application.instance === undefined) {
      Application.instance = new Application(ui);
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

      this.ui.displayMessage("Invalid input. Please enter y or n.");
    }

    this.displayItemSummary(items);

    this.ui.displayMessage("\nItem Tax Calculator completed.");
  }

  private async processFirstItem(): Promise<Item[] | null> {
    const commandLineArguments = process.argv.slice(2);

    const items: Item[] = [];

    if (commandLineArguments.length > 0) {
      this.handleItem(commandLineArguments, items);

      return items;
    }

    const itemDetails = await this.ui.askQuestion("\nEnter item details: ");

    if (itemDetails.trim().length === 0) {
      this.ui.displayError("Please provide item details.");

      return null;
    }

    this.handleItem(itemDetails.trim().split(/\s+/), items);

    return items;
  }

  private async askToAddAnotherItem(): Promise<string> {
    return (
      await this.ui.askQuestion(
        "\nDo you want to enter details of any other item (y/n): ",
      )
    )
      .trim()
      .toLowerCase();
  }

  private async collectAdditionalItem(items: Item[]): Promise<void> {
    const itemDetails = await this.ui.askQuestion("Enter item details: ");

    const itemArguments = itemDetails.trim().split(/\s+/);

    this.handleItem(itemArguments, items);
  }

  private handleItem(itemArguments: string[], items: Item[]): void {
    try {
      const item = this.processor.process(itemArguments);

      items.push(item);

      this.ui.displayTable([this.itemDisplayMapper.mapItem(item)]);
    } catch (error) {
      this.displayProcessingError(error);
    }
  }

  private displayProcessingError(error: unknown): void {
    if (error instanceof Error) {
      this.ui.displayError(error.message);

      return;
    }

    this.ui.displayError("An unexpected error occurred.");
  }

  private displayItemSummary(items: Item[]): void {
    const totals = this.summaryCalculator.calculateTotals(items);

    this.ui.displayTable(this.itemDisplayMapper.mapItems(items));

    this.ui.displayTable([this.itemDisplayMapper.mapSummary(totals)]);
  }
}
