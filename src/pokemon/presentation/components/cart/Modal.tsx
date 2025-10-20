import Modal from "react-modal";
import { ComponentType } from "react";
import { CartView } from "../../../application/views/CartView";
import { Card } from "./Card";
import "../../styles/cart/modal.sass";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  cart: CartView;
};

export function CartModal({ isOpen, onRequestClose, cart }: Props) {
  const ModalSafeForReact18 = Modal as unknown as ComponentType<
    ReactModal["props"]
  >;

  return (
    <ModalSafeForReact18
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart"
      overlayClassName="cart-modal__backdrop"
      className="cart-modal"
    >
      <button
        className="cart-modal__close"
        onClick={onRequestClose}
        aria-label="Close"
      >
        Close
      </button>
      <h2 className="cart-modal__header">Cart</h2>
      <div className="cart-modal__body">
        {cart.items.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onLastItemRemoved={onRequestClose}
          />
        ))}
      </div>
    </ModalSafeForReact18>
  );
}
