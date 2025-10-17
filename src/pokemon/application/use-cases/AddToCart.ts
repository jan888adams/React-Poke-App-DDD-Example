import { CartService } from "../services/CartService";
import { Pokemon } from "../../domain/entities/Pokemon";

export class AddToCart {
  constructor(private readonly cartService: CartService) {}

  execute(pokemon: Pokemon): void {
    const alreadyAdded = this.cartService
      .getCartItems()
      .some((p) => p.getId() === pokemon.getId());

    if (alreadyAdded) {
      return;
    }

    this.cartService.addToCart(pokemon);
  }
}
