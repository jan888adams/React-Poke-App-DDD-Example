import { CartView } from "../../application/views/CartView";
import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { CardId } from "../../domain/value-objects/cart/CartId";
import { SerializedPokemon } from "../dtos/SerializedPokemon";

export class CartLocalStorageRepository implements CartRepository {
  constructor(private readonly storage: Storage = window.localStorage) {}

  public save(cart: Cart): void {
    try {
      this.storage.setItem(
        "pokemon_cart_last",
        "pokemon_cart_" + cart.id.getValue(),
      );

      this.storage.setItem(
        "pokemon_cart_" + cart.id.getValue(),
        JSON.stringify(CartView.fromCart(cart)),
      );
    } catch (err) {
      console.warn("Failed to save cart to localStorage", err);
    }
  }

  public findLast(): Cart | null {
    const lastCartKey = this.storage.getItem("pokemon_cart_last");

    if (!lastCartKey) {
      return null;
    }

    const data = this.storage.getItem(lastCartKey);

    if (!data) {
      return null;
    }

    try {
      return this.parseCart(data);
    } catch (err) {
      console.warn("Failed to parse cart from localStorage", err);
      return null;
    }
  }

  public findById(cartId: CardId): Cart | null {
    const data = this.storage.getItem("pokemon_cart_" + cartId.getValue());

    if (!data) {
      return null;
    }

    try {
      return this.parseCart(data);
    } catch (err) {
      console.warn("Failed to parse cart from localStorage", err);
      return null;
    }
  }

  private parseCart(data: string): Cart | null {
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
    return Cart.fromValues(CardId.fromString(parsed.id), items);
  }
}
