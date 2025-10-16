import { useCart } from "../../hooks/useCart";

export function Counter() {
  const cart = useCart();

  const count = cart ? cart.cartItems.length : 0;

  return <div> {count} </div>;
}
