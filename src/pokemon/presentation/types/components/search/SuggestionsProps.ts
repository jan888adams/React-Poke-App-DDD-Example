export type SuggestionsProps = {
  inputValue: string;
  onSuggestionSelect: (value: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  focusedIndex: number;
};
