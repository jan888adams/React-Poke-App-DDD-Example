import { SuggestionSearchAdapter } from "../../../../src/pokemon/infrastructure/adapters/SuggestionSearchAdapter";
import { Suggestion } from "../../../../src/pokemon/domain/entities/Suggestion";

describe("SuggestionSearchAdapter", () => {
  let adapter: SuggestionSearchAdapter;

  beforeEach(() => {
    adapter = new SuggestionSearchAdapter();
  });

  it("should save suggestions to the tree", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
    ];

    adapter.saveSuggestions(suggestions);

    const results = adapter.findSuggestions("");
    expect(results).toEqual(suggestions);
  });

  it("should find suggestions by prefix", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "butterfree" }),
    ];

    adapter.saveSuggestions(suggestions);

    const results = adapter.findSuggestions("bu");
    expect(results).toEqual([
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "butterfree" }),
    ]);
  });

  it("should return an empty array if no suggestions match the prefix", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
    ];

    adapter.saveSuggestions(suggestions);

    const results = adapter.findSuggestions("xyz");
    expect(results).toEqual([]);
  });

  it("should handle an empty tree gracefully", () => {
    const results = adapter.findSuggestions("a");
    expect(results).toEqual([]);
  });

  it("should find all suggestions when the prefix is empty", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "squirtle" }),
    ];

    adapter.saveSuggestions(suggestions);

    const results = adapter.findSuggestions("");
    expect(results).toEqual(suggestions);
  });
});
