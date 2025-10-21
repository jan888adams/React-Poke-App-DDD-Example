import { SearchPokemonById } from "../../../../src/pokemon/application/use-cases/SearchPokemonById";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";
import { PokemonId } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonId";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";

describe("SearchPokemonById use case", () => {
  const mockRepository = {
    findById: jest.fn(),
  };

  let useCase: SearchPokemonById;
  let mockPokemon: Pokemon;

  beforeEach(() => {
    // avoid `any` by casting through `unknown` to the repository interface
    useCase = new SearchPokemonById(
      mockRepository as unknown as PokemonRepository,
    );
    mockRepository.findById.mockReset();

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

  it("should return PokemonView when repository finds it", async () => {
    mockRepository.findById.mockResolvedValue(mockPokemon);

    const result = await useCase.execute(25);

    expect(mockRepository.findById).toHaveBeenCalledWith(
      PokemonId.fromNumber(25),
    );
    const expectedView = PokemonView.fromPokemon(mockPokemon);
    expect(result).toStrictEqual(expectedView);
  });

  it("should return null when repository does not find Pokemon", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

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
