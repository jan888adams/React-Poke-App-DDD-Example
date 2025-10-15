import React from "react";
import { Pokemon } from "../../../domain/entities/Pokemon";
import "../../styles/search/card.sass";

interface Props {
  pokemon: Pokemon;
}

export const Card: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={pokemon.getImageUrl() || ""}
        alt={pokemon.getName()}
      />
      <h2 className="card__title">{pokemon.getCapitalizedName()}</h2>
      <p className="card__id">ID: #{pokemon.getId()}</p>
      <p className="card__types">Types: {pokemon.getTypes().join(", ")}</p>
    </div>
  );
};

