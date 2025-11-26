import { useState, useCallback } from "react";
import { PokemonView } from "../../application/views/PokemonView";
import { searchPokemonByName } from "../../../shared/infrastructure/di/DependencyContainer";
import { SearchResult } from "../types/hooks/SearchResult";
import { searchPokemonById } from "../../../shared/infrastructure/di/DependencyContainer";

export const usePokemonSearch = (): SearchResult => {
  const [pokemon, setPokemon] = useState<PokemonView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setError("Please enter a Pokemon ID or name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: PokemonView | null;
      const numericId = parseInt(query);
      if (!isNaN(numericId) && numericId > 0) {
        result = await searchPokemonById.execute(numericId);
      } else {
        result = await searchPokemonByName.execute(query);
      }
      setPokemon(result);

      if (!result) {
        setError(`Pokemon "${query}" not found`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pokemon,
    loading,
    error,
    searchPokemon,
  };
};
