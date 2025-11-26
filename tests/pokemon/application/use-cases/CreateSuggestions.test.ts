import { CreateSuggestions } from "../../../../src/pokemon/application/use-cases/CreateSuggestions";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { SuggestionRepository } from "../../../../src/pokemon/domain/repositories/SuggestionRepository";

jest.mock("../../../../src/pokemon/domain/entities/Suggestion", () => {
  const originalModule = jest.requireActual(
    "../../../../src/pokemon/domain/entities/Suggestion",
  );

  return {
    ...originalModule,
    Suggestion: {
      ...originalModule.Suggestion,
      fromString: jest.fn((name: string) => {
        return {
          id: { getValue: () => `${name}-mock-id` },
          name: { getValue: () => name },
        };
      }),
    },
  };
});

describe("CreateSuggestions", () => {
  let createSuggestions: CreateSuggestions;
  let mockPokemonRepository: jest.Mocked<PokemonRepository>;
  let mockSuggestionRepository: jest.Mocked<SuggestionRepository>;

  beforeEach(() => {
    mockPokemonRepository = {
      getNames: jest.fn(),
    } as Partial<PokemonRepository> as jest.Mocked<PokemonRepository>;

    mockSuggestionRepository = {
      hasSuggestions: jest.fn(),
      saveSuggestions: jest.fn(),
      search: jest.fn(),
    } as Partial<SuggestionRepository> as jest.Mocked<SuggestionRepository>;

    createSuggestions = new CreateSuggestions(
      mockPokemonRepository,
      mockSuggestionRepository,
    );
  });

  it("should not create suggestions if they already exist", async () => {
    (mockSuggestionRepository.hasSuggestions as jest.Mock).mockResolvedValue(
      true,
    );

    await createSuggestions.execute();

    expect(mockSuggestionRepository.hasSuggestions).toHaveBeenCalled();
    expect(mockPokemonRepository.getNames).not.toHaveBeenCalled();
    expect(mockSuggestionRepository.saveSuggestions).not.toHaveBeenCalled();
  });

  it("should create suggestions if none exist", async () => {
    (mockSuggestionRepository.hasSuggestions as jest.Mock).mockResolvedValue(
      false,
    );
    (mockPokemonRepository.getNames as jest.Mock).mockResolvedValue([
      { getValue: () => "charmander" },
      { getValue: () => "bulbasaur" },
    ]);

    await createSuggestions.execute();

    expect(mockSuggestionRepository.hasSuggestions).toHaveBeenCalled();
    expect(mockPokemonRepository.getNames).toHaveBeenCalled();
    expect(mockSuggestionRepository.saveSuggestions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.objectContaining({ getValue: expect.any(Function) }),
          id: expect.objectContaining({ getValue: expect.any(Function) }),
        }),
      ]),
    );
  });
});
