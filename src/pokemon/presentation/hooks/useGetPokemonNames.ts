import { useState, useEffect } from "react";
import { getPokemonNames } from "../../../shared/infrastructure/di/DependencyContainer";

export const useGetPokemonNames = () => {
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        setLoading(true);
        const names = await getPokemonNames.execute();
        setAllPokemonNames(names);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonNames();
  }, []);

  return { allPokemonNames, loading, error };
};
