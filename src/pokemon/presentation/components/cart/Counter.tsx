import { usePokemonCart } from "../../hooks/usePokemonCart";
import "../../styles/cart/counter.sass";

export function Counter() {
  const { cart } = usePokemonCart();
  const count = cart ? cart.count() : 0;

  return (
    <div className="cart-counter" aria-label="Cart items">
      <img
        src="/pokeball.png"
        alt=""
        aria-hidden="true"
        className="cart-counter__icon"
      />
      <span className="cart-counter__count">{count}</span>
    </div>
  );
}
