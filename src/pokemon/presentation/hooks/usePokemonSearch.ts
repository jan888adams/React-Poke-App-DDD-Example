import { useState, useCallback } from "react";
import { pokemonFinder } from "../../../shared/infrastructure/DependencyContainer";
import { Pokemon } from "../../domain/entities/Pokemon";

interface SearchResult {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  searchPokemon: (query: string) => Promise<void>;
}

export const usePokemonSearch = (): SearchResult => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
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
      const result = await pokemonFinder.findByIdOrName(query.trim());
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
