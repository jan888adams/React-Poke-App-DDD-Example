import { Cart } from "../../domain/entities/Cart";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { CartView } from "../views/CartView";

export class GetPokemonsFromCart {
  constructor(private readonly cartRepository: CartRepository) {}

  execute(): CartView {
    let cart = this.cartRepository.findLast();

    if (!cart) {
      cart = Cart.empty();
      this.cartRepository.save(cart);
    }

    return CartView.fromCart(cart);
  }
}
