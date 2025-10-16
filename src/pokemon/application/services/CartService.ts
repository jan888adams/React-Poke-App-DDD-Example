import mitt from "mitt";
import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";

export class CartService {
  private emitter = mitt<CartEvent>();

  constructor(private cart: Cart) {}

  public addToCart(pokemon: Pokemon) {
    this.cart.add(pokemon);
    this.emitter.emit("change", this.cart.getItems());
  }

  public removeFromCart(id: number) {
    this.cart.remove(id);
    this.emitter.emit("change", this.cart.getItems());
  }

  public getCartItems(): Pokemon[] {
    return this.cart.getItems();
  }

  public clearCart() {
    this.cart.clear();
    this.emitter.emit("change", this.cart.getItems());
  }

  public onChange(handler: (items: Pokemon[]) => void) {
    this.emitter.on("change", handler);
  }

  public offChange(handler: (items: Pokemon[]) => void) {
    this.emitter.off("change", handler);
  }
}
