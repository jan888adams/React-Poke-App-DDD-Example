import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";

export class CartService {
  constructor(
    private readonly cart: Cart,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  public addToCart(pokemon: Pokemon) {
    this.cart.add(pokemon);
    this.emitter.emit("change", this.cart.getItems());
  }

  public getCartItems(): Pokemon[] {
    return this.cart.getItems();
  }

  public onChange(handler: (items: Pokemon[]) => void) {
    this.emitter.on("change", handler);
  }

  public offChange(handler: (items: Pokemon[]) => void) {
    this.emitter.off("change", handler);
  }
}
