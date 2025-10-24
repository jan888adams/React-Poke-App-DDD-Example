import React from "react";
import { useFindSuggestions } from "../../hooks/useFindSuggestions";

interface Props {
  inputValue: string;
  onSuggestionSelect: (value: string) => void;
}

export const Suggestions: React.FC<Props> = ({
  inputValue,
  onSuggestionSelect,
}) => {
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
        <li
          key={name}
          className="suggestions-item"
          onClick={() => onSuggestionSelect(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
