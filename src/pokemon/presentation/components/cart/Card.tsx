import { usePokemonCart } from "../../hooks/usePokemonCart";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/components/cart/CardProps";
import "../../styles/cart/card.sass";
import React from "react";

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
          src="/open-pokeball.png"
          alt="Remove from Cart"
          className="pokemon-card__remove-icon"
        />
      </button>
    </div>
  );
};
