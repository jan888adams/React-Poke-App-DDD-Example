import ReactModal from "react-modal";
import { ComponentType } from "react";
import { ModalProps } from "../../types/components/cart/ModalProps";
import { Card } from "./Card";
import "../../styles/cart/modal.sass";

export const CartModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  cart,
}) => {
  const Modal = ReactModal as unknown as ComponentType<ReactModal["props"]>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart"
      overlayClassName="cart-modal__backdrop"
      className="cart-modal"
    >
      <div className="cart-modal__header">
        <button
          className="cart-modal__close"
          onClick={onRequestClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="cart-modal__body">
        {cart.items.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            closeModal={onRequestClose}
          />
        ))}
      </div>
    </Modal>
  );
};
