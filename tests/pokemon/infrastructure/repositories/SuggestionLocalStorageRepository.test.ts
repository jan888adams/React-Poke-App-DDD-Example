import { Suggestion } from "../../../../src/pokemon/domain/entities/Suggestion";
import { SuggestionLocalStorageRepository } from "../../../../src/pokemon/infrastructure/repositories/SuggestionLocalStorageRepository";
import { SuggestionSearchAdapter } from "../../../../src/pokemon/infrastructure/adapters/SuggestionSearchAdapter";

describe("SuggestionLocalStorageRepository", () => {
  let repository: SuggestionLocalStorageRepository;
  let mockSearchAdapter: jest.Mocked<SuggestionSearchAdapter>;
  let mockStorage: jest.Mocked<Storage>;

  beforeEach(() => {
    mockSearchAdapter = {
      saveSuggestions: jest.fn(),
      findSuggestions: jest.fn().mockReturnValue([]),
    } as Partial<SuggestionSearchAdapter> as jest.Mocked<SuggestionSearchAdapter>;

    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    } as jest.Mocked<Storage>;

    repository = new SuggestionLocalStorageRepository(
      mockSearchAdapter,
      mockStorage,
    );
  });

  it("should save suggestions to localStorage", async () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
    ];

    (mockSearchAdapter.findSuggestions as jest.Mock).mockReturnValue(
      suggestions,
    );

    await repository.saveSuggestions(suggestions);

    expect(mockSearchAdapter.saveSuggestions).toHaveBeenCalledWith(suggestions);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "pokemon_suggestions",
      JSON.stringify([
        { id: "1", name: "charmander" },
        { id: "2", name: "bulbasaur" },
      ]),
    );
  });

  it("should load suggestions from localStorage on initialization", () => {
    const storedData = JSON.stringify([
      { id: "1", name: "charmander" },
      { id: "2", name: "bulbasaur" },
    ]);

    (mockStorage.getItem as jest.Mock).mockReturnValue(storedData);

    repository = new SuggestionLocalStorageRepository(
      mockSearchAdapter,
      mockStorage,
    );

    expect(mockStorage.getItem).toHaveBeenCalledWith("pokemon_suggestions");
    expect(mockSearchAdapter.saveSuggestions).toHaveBeenCalledWith([
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
    ]);
  });

  it("should find suggestions by prefix", async () => {
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "charmander" }),
      Suggestion.fromObject({ id: "2", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "3", name: "butterfree" }),
    ];

    (mockSearchAdapter.findSuggestions as jest.Mock).mockReturnValue(
      suggestions,
    );

    const results = await repository.search("bu");
    expect(mockSearchAdapter.findSuggestions).toHaveBeenCalledWith("bu");
    expect(results).toEqual(suggestions);
  });

  it("should return true if suggestions exist in localStorage", async () => {
    (mockStorage.getItem as jest.Mock).mockReturnValue("[]");

    const hasSuggestions = await repository.hasSuggestions();
    expect(mockStorage.getItem).toHaveBeenCalledWith("pokemon_suggestions");
    expect(hasSuggestions).toBe(true);
  });

  it("should return false if no suggestions exist in localStorage", async () => {
    (mockStorage.getItem as jest.Mock).mockReturnValue(null);

    const hasSuggestions = await repository.hasSuggestions();
    expect(mockStorage.getItem).toHaveBeenCalledWith("pokemon_suggestions");
    expect(hasSuggestions).toBe(false);
  });
});
