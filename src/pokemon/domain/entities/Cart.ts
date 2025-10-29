import { CardId } from "../value-objects/cart/CartId";
import { PokemonId } from "../value-objects/pokemon/PokemonId";
import { Pokemon } from "./Pokemon";

export class Cart {
  private constructor(
    public readonly id: CardId,
    private items: Pokemon[] = [],
    
  ) {}

  public add(pokemon: Pokemon) {
    this.items.push(pokemon);
  }

  public remove(pokemonId: PokemonId) {
    this.items = this.items.filter(
      (p) => p.id.getValue() !== pokemonId.getValue(),
    );
  }

  public getItems(): Pokemon[] {
    return [...this.items];
  }

  public has(pokemonId: PokemonId): boolean {
    return this.items.some((p) => p.id.getValue() === pokemonId.getValue());
  }

  public static fromValues(id: CardId, items: Pokemon[]): Cart {
    return new Cart(id, items);
  }

  public static empty(): Cart {
    return new Cart(CardId.new(), []);
  }
}
