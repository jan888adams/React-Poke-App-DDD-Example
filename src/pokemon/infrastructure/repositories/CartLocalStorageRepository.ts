import { CartView } from "../../application/views/CartView";
import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { CardId } from "../../domain/value-objects/cart/CartId";
import { SerializedPokemon } from "../types/SerializedPokemon";

export class CartLocalStorageRepository implements CartRepository {
  public constructor(
    private readonly key: string,
    private readonly storage: Storage = window.localStorage,
  ) {}

  public async save(cart: Cart): Promise<void> {
    console.log("Saving cart:", cart);
    try {
      this.storage.setItem(
        this.key + "_last",
        this.key + "_" + cart.id.getValue(),
      );

      this.storage.setItem(
        this.key + "_" + cart.id.getValue(),
        JSON.stringify(CartView.fromCart(cart)),
      );
    } catch (err) {
      console.warn("Failed to save cart to localStorage", err);
    }
  }

  public async findLast(): Promise<Cart | null> {
    const lastCartKey = this.storage.getItem(this.key + "_last");

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

  public async findById(cartId: CardId): Promise<Cart | null> {
    const data = this.storage.getItem(this.key + "_" + cartId.getValue());

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

  private async parseCart(data: string): Promise<Cart | null> {
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
        SerializedPokemon.abilities.map((id) => ({ id })),
        SerializedPokemon.moves.map((id) => ({ id })),
      ),
    );

    return Cart.fromValues(CardId.fromString(parsed.id), items);
  }
}
