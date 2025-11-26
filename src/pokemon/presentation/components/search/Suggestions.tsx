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
    return (
      <ul className="suggestions__list">
        <li className="suggestions__loading">Loading...</li>
      </ul>
    );
  }

  if (error) {
    return (
      <ul className="suggestions__list">
        <li className="suggestions__error">{error}</li>
      </ul>
    );
  }

  if (!suggestions.length) {
    return null;
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
