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

    adapter.load(suggestions);

    const expectedOrder = [
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "1", name: "charmander" }),
    ];

    const results = adapter.find("");
    expect(results).toEqual(expectedOrder);
  });

  it("should find suggestions by prefix", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "butterfree" }),
    ];

    adapter.load(suggestions);

    const results = adapter.find("bu");
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

    adapter.load(suggestions);

    const results = adapter.find("xyz");
    expect(results).toEqual([]);
  });

  it("should handle an empty tree gracefully", () => {
    const results = adapter.find("a");
    expect(results).toEqual([]);
  });

  it("should find all suggestions when the prefix is empty", () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "squirtle" }),
    ];

    adapter.load(suggestions);

    const expectedOrder = [
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "3", name: "squirtle" }),
    ];

    const results = adapter.find("");
    expect(results).toEqual(expectedOrder);
  });
});
