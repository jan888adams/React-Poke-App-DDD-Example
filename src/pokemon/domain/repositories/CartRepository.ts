import { Cart } from "../entities/Cart";

export interface CartRepository {
  save(cart: Cart): void;

  findLast(): Cart | null;
}
