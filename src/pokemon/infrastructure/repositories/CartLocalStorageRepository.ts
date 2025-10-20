import { CartView } from "../../application/views/CartView";
import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { SerializedPokemon } from "../dtos/SerializedPokemon";

export class CartLocalStorageRepository implements CartRepository {
  constructor(private readonly storage: Storage = window.localStorage) {}

  public save(cart: Cart): void {
    try {
      this.storage.setItem(
        "pokemon_cart",
        JSON.stringify(CartView.fromCart(cart)),
      );
    } catch (err) {
      console.warn("Failed to save cart to localStorage", err);
    }
  }

  public findLast(): Cart | null {
    const data = this.storage.getItem("pokemon_cart");

    if (!data) {
      return null;
    }

    try {
      const parsed = JSON.parse(data);
      const items = parsed.items.map((SerializedPokemon: SerializedPokemon) =>
        Pokemon.fromValues(
          SerializedPokemon.id,
          SerializedPokemon.name,
          SerializedPokemon.imageUrl,
          SerializedPokemon.types,
          SerializedPokemon.baseExperience,
          SerializedPokemon.height,
          SerializedPokemon.weight,
        ),
      );
      return Cart.fromValues(parsed.id, items);
    } catch (err) {
      console.warn("Failed to parse cart from localStorage", err);
      return null;
    }
  }
}
