import { Cart } from "../entities/Cart";
import { CardId } from "../value-objects/cart/CartId";

export interface CartRepository {
  save(cart: Cart): Promise<void>;

  findLast(): Promise<Cart | null>;

  findById(cartId: CardId): Promise<Cart | null>;
}
