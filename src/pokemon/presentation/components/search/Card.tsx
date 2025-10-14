import React from "react";
import { Pokemon } from "../../../domain/entities/Pokemon";

interface Props {
  pokemon: Pokemon;
}

const Card: React.FC<Props> = ({ pokemon }) => {
  return (
    <div>
      <img src={pokemon.getImageUrl() || ""} alt={pokemon.getName()} />
      <h2>{pokemon.getCapitalizedName()}</h2>
      <p>ID: #{pokemon.getId()}</p>
      <p>Types: {pokemon.getTypes().join(", ")}</p>
    </div>
  );
};

export default Card;
