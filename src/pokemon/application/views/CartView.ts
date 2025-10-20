import { PokemonView } from "./PokemonView";
import { Cart } from "../../domain/entities/Cart";

export class CartView {
  constructor(public readonly items: PokemonView[]) {}

  public count(): number {
    return this.items.length;
  }

  public static fromCart(cart: Cart): CartView {
    return new CartView(
      cart.getItems().map((item) => PokemonView.fromPokemon(item)),
    );
  }
}
