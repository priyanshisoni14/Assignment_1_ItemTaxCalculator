import { ItemType } from "./ItemType";

export interface ParsedItemInput {
  name: string;

  price?: number;

  quantity?: number;

  type: ItemType;
}
