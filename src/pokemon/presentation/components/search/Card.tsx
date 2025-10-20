import React from "react";
import { Link } from "react-router-dom";
import { PokemonView } from "../../../application/views/PokemonView";
import "../../styles/search/card.sass";

interface Props {
  pokemon: PokemonView;
}

export const Card: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={pokemon.imageUrl || ""}
        alt={pokemon.altText}
      />
      <h2 className="card__title">{pokemon.name}</h2>
      <p className="card__id">ID: #{pokemon.id}</p>
      <p className="card__types">Types: {pokemon.types.join(", ")}</p>
      <Link
        to={`/pokemon/${pokemon.id}`}
        state={{ pokemon }}
        className="card__details-link"
      >
        View Details
      </Link>
    </div>
  );
};
