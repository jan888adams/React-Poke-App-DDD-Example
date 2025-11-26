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
  const [cart, setCart] = useState<CartView | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const fetchedCart = await getPokemonCart.execute();
        setCart(fetchedCart);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, []);

  const handleChange = useCallback((updatedCart: CartEvent["change"]) => {
    setCart(updatedCart);
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

  const addToCart = async (pokemon: PokemonDto) => {
    try {
      await addPokemonToCart.execute(pokemon, cart?.id ?? null);
    } catch (err) {
      console.error("Failed to add Pokémon to cart:", err);
    }
  };

  const removeFromCart = async (pokemon: PokemonDto) => {
    if (!cart) {
      return;
    }

    try {
      await removePokemonFromCart.execute(pokemon, cart.id);
    } catch (err) {
      console.error("Failed to remove Pokémon from cart:", err);
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};
