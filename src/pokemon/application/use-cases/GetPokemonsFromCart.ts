import { CartService } from "../services/CartService";
import { Pokemon } from "../../domain/entities/Pokemon";

export class GetPokemonsFromCart {
  constructor(private readonly cartService: CartService) {}

  execute(): Pokemon[] {
    return this.cartService.getCartItems();
  }
}
