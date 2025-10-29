import { CartView } from "../../../../application/views/CartView";

export type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  cart: CartView;
};
