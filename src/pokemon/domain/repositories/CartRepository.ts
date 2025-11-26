import { Cart } from "../entities/Cart";
import { CardId } from "../value-objects/cart/CartId";

export interface CartRepository {
  save(cart: Cart): void;

  findLast(): Cart | null;

  findById(cartId: CardId): Cart | null;
}
