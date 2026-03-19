import { Cart } from "../entities/Cart";
import { CartId } from "../value-objects/cart/CartId";

export interface CartRepository {
  save(cart: Cart): Promise<void>;

  findLast(): Promise<Cart | null>;

  findById(cartId: CartId): Promise<Cart | null>;
}
