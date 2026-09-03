import { Item } from "../models/assignment1/Item";
import { ItemFactory } from "../factory/assignment1/ItemFactory";
import { InputParser } from "../parser/InputParser";
import { ItemInputMapper } from "../utils/assignment1/ItemInputMapper";

export class ItemProcessor {
  constructor(
    private readonly parser: InputParser,
    private readonly mapper: ItemInputMapper,
  ) {}

  process(args: string[]): Item {
    // Parse and validate the raw input
    // using the configured input rules.
    const input = this.parser.parse(args);

    // Map the generic parsed input
    // to the item-specific input structure.
    const parsedInput = this.mapper.map(input);

    // Create the appropriate item
    // based on the parsed item type.
    return ItemFactory.create(parsedInput);
  }
}
