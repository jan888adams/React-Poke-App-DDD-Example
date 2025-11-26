import { CartRepository } from "../../domain/repositories/CartRepository";
import { CartView } from "../views/CartView";

export class GetPokemonCart {
  constructor(private readonly cartRepository: CartRepository) {}

  execute(): CartView | null {
    const cart = this.cartRepository.findLast();

    if (!cart) {
      return null;
    }

    return CartView.fromCart(cart);
  }
}
