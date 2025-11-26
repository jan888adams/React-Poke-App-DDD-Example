import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import {
  addPokemonToCart,
  getPokemonCart,
  removePokemonFromCart,
} from "../../../shared/infrastructure/di/DependencyContainer";
import { CartEvent } from "../../application/events/CartEvent";
import { CartView } from "../../application/views/CartView";
import { PokemonDto } from "../../application/dtos/PokemonDto";

export const usePokemonCart = () => {
  const emitter = useContext(CartContext);
  const [cart, setCart] = useState<CartView | null>(() =>
    getPokemonCart.execute(),
  );

  const handleChange = useCallback((cart: CartEvent["change"]) => {
    setCart(cart);
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

  const addToCart = (pokemon: PokemonDto) => {
    addPokemonToCart.execute(pokemon, cart?.id ?? null);
  };

  const removeFromCart = (pokemon: PokemonDto) => {
    if (!cart) {
      return;
    }
    removePokemonFromCart.execute(pokemon, cart.id);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};
