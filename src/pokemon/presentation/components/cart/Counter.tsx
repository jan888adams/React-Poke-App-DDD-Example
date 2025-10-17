import { usePokemonCart } from "../../hooks/usePokemonCart";

export function Counter() {
  const cart = usePokemonCart();

  const count = cart ? cart.cartItems.length : 0;

  return <div> {count} </div>;
}
