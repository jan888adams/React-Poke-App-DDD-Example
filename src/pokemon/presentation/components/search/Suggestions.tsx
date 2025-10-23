import React from "react";
import { useFindSuggestions } from "../../hooks/useFindSuggestions";

interface SuggestionsProps {
  inputValue: string;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ inputValue }) => {
  const { suggestions, loading, error } = useFindSuggestions(inputValue);

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
