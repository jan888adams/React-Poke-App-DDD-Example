import { PokemonView } from "./PokemonView";
import { Cart } from "../../domain/entities/Cart";

export class CartView {
  public constructor(
    public readonly id: string,
    public readonly items: PokemonView[],
  ) {}

  public count(): number {
    return this.items.length;
  }

  public has(pokemonId: number): boolean {
    return this.items.some((item) => item.id === pokemonId);
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public static fromCart(cart: Cart): CartView {
    return new CartView(
      cart.id.getValue(),
      cart.getItems().map((item) => PokemonView.fromPokemon(item)),
    );
  }
}
