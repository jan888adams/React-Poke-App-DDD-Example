import React from "react";
import Form from "./Form";
import { usePokemonSearch } from "../../hooks/usePokemonSearch";
import Card from "./Card";
import "../../styles/search/search-bar.sass";

const SearchBar: React.FC = () => {
  const { pokemon, searchPokemon, error, loading } = usePokemonSearch();

  const handleSubmit = (value: string) => {
    searchPokemon(value);
  };

  return (
    <div className="search-bar">
      <Form onSubmit={handleSubmit} />
      {pokemon && <Card pokemon={pokemon} />}
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchBar;
