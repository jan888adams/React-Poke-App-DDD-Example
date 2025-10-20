import { PokemonId } from "../value-objects/PokemonId";
import { Pokemon } from "./Pokemon";

export class Cart {
  private items: Pokemon[] = [];

  public add(pokemon: Pokemon) {
    this.items.push(pokemon);
  }

  public getItems(): Pokemon[] {
    return [...this.items];
  }

  public has(pokemonId: PokemonId): boolean {
    return this.items.some((p) => p.getId() === pokemonId.getValue());
  }
}
