import React, { useState, useEffect } from "react";
import { useGetPokemonNames } from "../../hooks/useGetPokemonNames";

interface SuggestionsProps {
  inputValue: string;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ inputValue }) => {
  const { allPokemonNames, loading, error } = useGetPokemonNames();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = allPokemonNames
        .filter((name) =>
          name.toLowerCase().startsWith(inputValue.toLowerCase()),
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    }
  }, [inputValue, allPokemonNames]);

  if (loading) {
    return <div className="suggestions-loading">Loading...</div>;
  }

  if (error) {
    return <div className="suggestions-error">{error}</div>;
  }

  return (
    <ul className="suggestions-list">
      {suggestions.map((name) => (
        <li key={name} className="suggestions-item">
          {name}
        </li>
      ))}
    </ul>
  );
};
