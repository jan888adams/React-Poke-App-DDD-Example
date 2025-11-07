import { usePokemonCart } from "../../hooks/usePokemonCart";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/components/cart/CardProps";
import React from "react";
import pokeballImage from "../../assets/pokeball.png";
import "../../styles/cart/card.sass";

export const Card: React.FC<CardProps> = ({ pokemon, closeModal }) => {
  const { cart, removeFromCart } = usePokemonCart();
  const navigate = useNavigate();

  const handleRemove = () => {
    removeFromCart(pokemon);

    if (cart?.items.length === 1) {
      closeModal();
    }
  };

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
    closeModal();
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <div className="pokemon-card__content">
        <img
          className="pokemon-card__image"
          src={pokemon.imageUrl || ""}
          alt={pokemon.altText}
        />
        <h2 className="pokemon-card__name">{pokemon.name}</h2>
      </div>
      <button
        className="pokemon-card__remove"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        aria-label="Remove from Cart"
      >
        <img
          className="pokeball-image"
          src={pokeballImage}
          alt="Remove from Cart"
        />
      </button>
    </div>
  );
};
