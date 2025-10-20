import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";

export class GetPokemonsFromCart {
  constructor(private readonly cart: Cart) {}

  execute(): Pokemon[] {
    return this.cart.getItems();
  }
}
