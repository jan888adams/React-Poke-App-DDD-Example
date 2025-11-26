import { Cart } from "../../domain/entities/Cart";
import { CartView } from "../views/CartView";

export class GetPokemonsFromCart {
  constructor(private readonly cart: Cart) {}

  execute(): CartView {
    return CartView.fromCart(this.cart);
  }
}
