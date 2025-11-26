import { SearchPokemonByName } from "../../../../src/pokemon/application/use-cases/SearchPokemonByName";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonName";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";

describe("SearchPokemonByName", () => {
  let mockRepository: jest.Mocked<PokemonRepository>;
  let useCase: SearchPokemonByName;
  let mockPokemon: Pokemon;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findByName: jest.fn(),
      getAll: jest.fn(),
      getNames: jest.fn(),
    };
    useCase = new SearchPokemonByName(mockRepository);

    mockPokemon = Pokemon.fromValues(
      25,
      "pikachu",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      ["electric"],
      112,
      4,
      60,
      [{ id: 25 }],
      [{ id: 25 }],
    );
  });

  it("should return PokemonView when repository finds it", async () => {
    mockRepository.findByName.mockResolvedValue(mockPokemon);

    const result = await useCase.execute("pikachu");

    expect(mockRepository.findByName).toHaveBeenCalledWith(
      PokemonName.fromString("pikachu"),
    );
    expect(result).toStrictEqual(PokemonView.fromPokemon(mockPokemon));
  });

  it("should return null when repository does not find Pokemon", async () => {
    mockRepository.findByName.mockResolvedValue(null);

    const result = await useCase.execute("unknown");

    expect(mockRepository.findByName).toHaveBeenCalledWith(
      PokemonName.fromString("unknown"),
    );
    expect(result).toBeNull();
  });

  it("should trim whitespace from name", async () => {
    mockRepository.findByName.mockResolvedValue(mockPokemon);

    await useCase.execute("  pikachu  ");

    expect(mockRepository.findByName).toHaveBeenCalledWith(
      PokemonName.fromString("pikachu"),
    );
  });

  it("should throw error for empty name", async () => {
    await expect(useCase.execute("")).rejects.toThrow(
      "Pokemon name cannot be empty",
    );
    await expect(useCase.execute("   ")).rejects.toThrow(
      "Pokemon name cannot be empty",
    );
  });
});
