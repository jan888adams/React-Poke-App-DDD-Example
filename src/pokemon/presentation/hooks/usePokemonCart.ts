import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import { Pokemon } from "../../domain/entities/Pokemon";
import {
  addPokemonToCart,
  getPokemonsFromCart,
} from "../../../shared/infrastructure/DependencyContainer";
import { CartEvent } from "../../application/events/CartEvent";

export const usePokemonCart = () => {
  const emitter = useContext(CartContext);
  const [cartItems, setCartItems] = useState<Pokemon[]>(() =>
    getPokemonsFromCart.execute(),
  );

  const handleChange = useCallback((items: CartEvent["change"]) => {
    setCartItems(items);
  }, []);

  useEffect(() => {
    if (!emitter) {
      return;
    }

    emitter.on("change", handleChange);
    return () => {
      emitter.off("change", handleChange);
    };
  }, [emitter, handleChange]);

  const addToCart = (pokemon: Pokemon) => {
    addPokemonToCart.execute(pokemon);
  };

  return {
    cartItems,
    addToCart,
  };
};
