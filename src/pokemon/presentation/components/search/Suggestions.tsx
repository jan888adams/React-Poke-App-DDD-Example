import React, { useEffect } from "react";
import { useFindSuggestions } from "../../hooks/useFindSuggestions";
import "../../styles/search/suggestions.sass";

interface Props {
  inputValue: string;
  onSuggestionSelect: (value: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  focusedIndex: number;
}

export const Suggestions: React.FC<Props> = ({
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
