import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Pokemon } from "../../domain/entities/Pokemon";

export const useCart = () => {
  const cartService = useContext(CartContext);
  const [cartItems, setCartItems] = useState<Pokemon[]>(
    cartService?.getCartItems() ?? [],
  );

  useEffect(() => {
    if (!cartService) return;
    const handler = (items: Pokemon[]) => setCartItems(items);
    cartService.onChange(handler);
    return () => {
      cartService.offChange(handler);
    };
  }, [cartService]);

  return {
    cartItems,
    addToCart: (pokemon: Pokemon) => cartService?.addToCart(pokemon),
    removeFromCart: (id: number) => cartService?.removeFromCart(id),
    clearCart: () => cartService?.clearCart(),
  };
};
