import React, { useMemo } from "react";
import { useGetPokemons } from "../../hooks/useGetPokemons";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../../styles/pokedex/grid.sass";

export const Grid: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 30;

  const sortBy = searchParams.get("sortBy") || "id";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const { pokemons, loading, error } = useGetPokemons(page, limit);

  const sortedPokemons = useMemo(() => {
    if (!pokemons) return [];

    return [...pokemons].sort((a, b) => {
      if (sortBy === "name") {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? comparison : -comparison;
      } else if (sortBy === "id") {
        const comparison = a.id - b.id;
        return sortOrder === "asc" ? comparison : -comparison;
      }
      return 0;
    });
  }, [pokemons, sortBy, sortOrder]);

  const handleNextPage = () => {
    setSearchParams({ page: (page + 1).toString(), sortBy, sortOrder });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString(), sortBy, sortOrder });
    }
  };

  const handleBackToSearch = () => {
    navigate("/");
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = event.target.value.split("-");
    setSearchParams({
      page: page.toString(),
      sortBy: newSortBy,
      sortOrder: newSortOrder,
    });
  };

  if (loading) {
    return <div className="grid__loading">Loading...</div>;
  }

  if (error) {
    return <div className="grid__error">{error}</div>;
  }

  return (
    <div className="grid-container">
      <div className="grid__controls">
        <select
          id="sort"
          className="grid__select"
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
        >
          <option value="id-asc">ID (Ascending)</option>
          <option value="id-desc">ID (Descending)</option>
          <option value="name-asc">Name (Ascending)</option>
          <option value="name-desc">Name (Descending)</option>
        </select>
      </div>
      <div className="grid">
        {sortedPokemons.map((pokemon) => (
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
      <div className="grid__back">
        <button className="grid__button" onClick={handleBackToSearch}>
          Back to Search
        </button>
      </div>
    </div>
  );
};
