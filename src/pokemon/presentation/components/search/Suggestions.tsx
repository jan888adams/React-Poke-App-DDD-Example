import React, { useEffect } from "react";
import { useFindSuggestions } from "../../hooks/useFindSuggestions";
import { SuggestionsProps } from "../../types/components/search/SuggestionsProps";
import "../../styles/search/suggestions.sass";

export const Suggestions: React.FC<SuggestionsProps> = ({
  inputValue,
  onSuggestionSelect,
  setSuggestions,
  focusedIndex,
}) => {
  const { suggestions, loading, error } = useFindSuggestions(inputValue);

  useEffect(() => {
    setSuggestions(suggestions);
  }, [suggestions, setSuggestions]);

  if (loading) {
    return <div className="suggestions__loading">Loading...</div>;
  }

  if (error) {
    return <div className="suggestions__error">{error}</div>;
  }

  return (
    <ul className="suggestions__list">
      {suggestions.map((name, index) => (
        <li
          key={name}
          className={`suggestions__item ${
            index === focusedIndex ? "suggestions__item--focused" : ""
          }`}
          onClick={() => onSuggestionSelect(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
