import { useState, useEffect } from "react";
import { findSuggestions } from "../../../shared/infrastructure/di/DependencyContainer";

export const useFindSuggestions = (term: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const normalizedTerm = term.trim().toLowerCase();
      if (normalizedTerm === "") {
        setSuggestions([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const fetchedSuggestions =
          await findSuggestions.execute(normalizedTerm);
        setSuggestions(fetchedSuggestions.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [term]);

  return { suggestions, loading, error };
};
