import { useState, useEffect } from "react";
import { PokemonView } from "../../application/views/PokemonView";
import { getPokemons } from "../../../shared/infrastructure/di/DependencyContainer";

export const useGetPokemons = (page: number, limit: number) => {
  const [pokemons, setPokemons] = useState<PokemonView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getPokemons.execute(page, limit);
        setPokemons(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, limit]);

  return { pokemons, loading, error };
};
