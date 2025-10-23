import { useState, useEffect } from "react";
import { findSuggestions } from "../../../shared/infrastructure/di/DependencyContainer";

export const useFindSuggestions = (prefix: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (prefix.trim() === "") {
        setSuggestions([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const fetchedSuggestions = await findSuggestions.execute(prefix);
        setSuggestions(fetchedSuggestions.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [prefix]);

  return { suggestions, loading, error };
};
