import { SearchPokemonById } from "../../../../src/pokemon/application/use-cases/SearchPokemonById";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonId } from "../../../../src/pokemon/domain/value-objects/PokemonId";

describe("SearchPokemonById", () => {
  let mockRepository: jest.Mocked<PokemonRepository>;
  let useCase: SearchPokemonById;
  let mockPokemon: Pokemon;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findByName: jest.fn(),
    };
    useCase = new SearchPokemonById(mockRepository);

    mockPokemon = Pokemon.fromValues(
      25,
      "pikachu",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      ["electric"],
      112,
      4,
      60,
    );
  });

  it("should return Pokemon when repository finds it", async () => {
    mockRepository.findById.mockResolvedValue(mockPokemon);

    const result = await useCase.execute(25);

    expect(mockRepository.findById).toHaveBeenCalledWith(
      PokemonId.fromNumber(25),
    );
    expect(result).toBe(mockPokemon);
  });

  it("should return null when repository does not find Pokemon", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(mockRepository.findById).toHaveBeenCalledWith(
      PokemonId.fromNumber(999),
    );
    expect(result).toBeNull();
  });

  it("should throw error for invalid ID", async () => {
    await expect(useCase.execute(0)).rejects.toThrow(
      "Pokemon ID must be greater than 0",
    );
    await expect(useCase.execute(-5)).rejects.toThrow(
      "Pokemon ID must be greater than 0",
    );
  });
});
