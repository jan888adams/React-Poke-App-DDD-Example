import { CartRepository } from "../../domain/repositories/CartRepository";
import { CartView } from "../views/CartView";

export class GetPokemonCart {
  public constructor(private readonly cartRepository: CartRepository) {}

  public async execute(): Promise<CartView | null> {
    const cart = await this.cartRepository.findLast();

    if (!cart) {
      return null;
    }

    return CartView.fromCart(cart);
  }
}
