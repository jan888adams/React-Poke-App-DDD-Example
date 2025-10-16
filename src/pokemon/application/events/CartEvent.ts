import { Pokemon } from "../../domain/entities/Pokemon";

export type CartEvent = {
  change: Pokemon[];
};
