import React from "react";
import { useGetPokemons } from "../../hooks/useGetPokemons";
import { useSearchParams } from "react-router-dom";
import "../../styles/pokedex/grid.sass";

export const Grid: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 30;

  const { pokemons, loading, error } = useGetPokemons(page, limit);

  const handleNextPage = () => {
    setSearchParams({ page: (page + 1).toString() });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
    }
  };

  if (loading) {
    return <div className="grid__loading">Loading...</div>;
  }

  if (error) {
    return <div className="grid__error">{error}</div>;
  }

  return (
    <div className="grid-container">
      <div className="grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="grid__item">
            <img
              className="grid__image"
              src={pokemon.imageUrl ?? ""}
              alt={pokemon.name}
            />
            <p className="grid__name">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className="grid__pagination">
        <button
          className="grid__button"
          onClick={handlePreviousPage}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button className="grid__button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};
