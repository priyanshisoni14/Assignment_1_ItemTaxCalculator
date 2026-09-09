import { InputConfig } from "../../models/InputConfig";
import { InputParser } from "../../parser/InputParser";
export class SingleFieldValidator {
  constructor(private readonly config: InputConfig) {}

  public validate(field: string, value: string): string | undefined {
    const fieldConfig: InputConfig = { [field]: this.config[field] };

    const parser = new InputParser(fieldConfig);

    try {
      parser.parseRecord({ [field]: value });

      return undefined;
    } catch (error) {
      return error instanceof Error ? error.message : "Invalid input.";
    }
  }
}