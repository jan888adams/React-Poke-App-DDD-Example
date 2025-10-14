import { SearchPokemonByName } from "../../../../src/pokemon/application/use-cases/SearchPokemonByName";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/PokemonName";
import { PokemonId } from "../../../../src/pokemon/domain/value-objects/PokemonId";
import { PokemonType } from "../../../../src/pokemon/domain/value-objects/PokemonType";

describe("SearchPokemonByName", () => {
  let mockRepository: jest.Mocked<PokemonRepository>;
  let useCase: SearchPokemonByName;
  let mockPokemon: Pokemon;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findByName: jest.fn(),
    };
    useCase = new SearchPokemonByName(mockRepository);

    mockPokemon = new Pokemon(
      PokemonId.fromNumber(25),
      PokemonName.fromString("pikachu"),
      { front_default: "https://example.com/pikachu.png" },
      [PokemonType.fromString("electric")],
    );
  });

  it("should return Pokemon when repository finds it", async () => {
    mockRepository.findByName.mockResolvedValue(mockPokemon);

    const result = await useCase.execute("pikachu");

    expect(mockRepository.findByName).toHaveBeenCalledWith(
      PokemonName.fromString("pikachu"),
    );
    expect(result).toBe(mockPokemon);
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
