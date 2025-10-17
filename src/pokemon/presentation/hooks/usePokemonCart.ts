import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Pokemon } from "../../domain/entities/Pokemon";
import {
  addPokemonToCart,
  getPokemonsFromCart,
} from "../../../shared/infrastructure/DependencyContainer";

export const usePokemonCart = () => {
  const cartService = useContext(CartContext);
  const [cartItems, setCartItems] = useState<Pokemon[]>(() =>
    getPokemonsFromCart.execute(),
  );

  useEffect(() => {
    if (!cartService) return;

    const handler = (items: Pokemon[]) => setCartItems(items);

    cartService.onChange(handler);
    return () => {
      cartService.offChange(handler);
    };
  }, [cartService]);

  const addToCart = (pokemon: Pokemon) => {
    addPokemonToCart.execute(pokemon);
  };

  return {
    cartItems,
    addToCart,
  };
};
