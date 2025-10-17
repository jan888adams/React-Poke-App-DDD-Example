import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Pokemon } from "../../domain/entities/Pokemon";
import { addToCart as addToCartUseCase } from "../../../shared/infrastructure/DependencyContainer";

export const useCart = () => {
  const cartService = useContext(CartContext);
  const [cartItems, setCartItems] = useState<Pokemon[]>(
    cartService?.getCartItems() ?? [],
  );

  useEffect(() => {
    if (!cartService) {
      return;
    }

    const handler = (items: Pokemon[]) => setCartItems(items);

    cartService.onChange(handler);

    return () => {
      cartService.offChange(handler);
    };
  }, [cartService]);

  const addToCart = (pokemon: Pokemon) => {
    addToCartUseCase.execute(pokemon);
  };

  return {
    cartItems,
    addToCart,
  };
};
