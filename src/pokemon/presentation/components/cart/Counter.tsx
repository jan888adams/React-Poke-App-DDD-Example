import { useState } from "react";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import { CartModal } from "./Modal";
import "../../styles/cart/counter.sass";

export function Counter() {
  const { cart } = usePokemonCart();
  const count = cart ? cart.count() : 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        type="button"
        className="cart-counter"
        aria-label={`Cart items: ${count}`}
        onClick={handleOpenModal}
      >
        <img
          src="/pokeball.png"
          alt=""
          aria-hidden="true"
          className="cart-counter__icon"
        />
        <span className="cart-counter__count">{count}</span>
      </button>

      {isModalOpen && (
        <CartModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          cart={cart}
        />
      )}
    </>
  );
}
