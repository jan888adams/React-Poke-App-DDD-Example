import { cartService } from "../../../shared/infrastructure/DependencyContainer";
import { CartContext } from "../context/CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartContext.Provider value={cartService}>{children}</CartContext.Provider>
  );
};
