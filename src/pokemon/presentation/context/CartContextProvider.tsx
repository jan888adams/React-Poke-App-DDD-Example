import React from "react";
import { cartEventEmitter } from "../../../shared/infrastructure/di/DependencyContainer";
import { CartContext } from "./CartContext";

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartContext.Provider value={cartEventEmitter}>
      {children}
    </CartContext.Provider>
  );
};
