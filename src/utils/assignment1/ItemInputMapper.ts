import { ParsedItemInput } from "../../models/assignment1/ParsedItemInput";
import { ItemType } from "../../models/assignment1/ItemType";

export class ItemInputMapper {
  map(input: Record<string, unknown>): ParsedItemInput {
    const parsedInput: ParsedItemInput = {
      name: input["-name"] as string,
      type: input["-type"] as ItemType,
    };

    if (input["-price"] !== undefined) {
      parsedInput.price = input["-price"] as number;
    }

    if (input["-quantity"] !== undefined) {
      parsedInput.quantity = input["-quantity"] as number;
    }

    return parsedInput;
  }
}
