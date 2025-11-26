import React from "react";
import { CardProps } from "../../types/components/search/CardProps";
import { Link } from "react-router-dom";
import "../../styles/search/card.sass";

export const Card: React.FC<CardProps> = ({ pokemon }) => (
  <Link
    to={`/pokemon/${pokemon.id}`}
    state={{ pokemon }}
    className="card card--link"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <img
      className="card__image"
      src={pokemon.imageUrl || ""}
      alt={pokemon.altText}
    />
    <h2 className="card__title">{pokemon.name}</h2>
    <p className="card__id">ID: {pokemon.id}</p>
    <p className="card__types">Types: {pokemon.types.join(", ")}</p>
  </Link>
);
