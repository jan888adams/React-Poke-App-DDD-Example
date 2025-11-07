import { useState } from "react";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import { CartModal } from "./Modal";
import pokeballImage from "../../assets/pokeball.png";
import "../../styles/cart/counter.sass";

export const Counter: React.FC = () => {
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
          src={pokeballImage}
          alt=""
          aria-hidden="true"
          className="cart-counter__icon"
        />
        <span className="cart-counter__count">{count}</span>
      </button>

      {cart && !cart.isEmpty() && isModalOpen && (
        <CartModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          cart={cart}
        />
      )}
    </>
  );
};
