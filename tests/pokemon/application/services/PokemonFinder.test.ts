import { PokemonFinder } from "../../../../src/pokemon/application/services/PokemonFinder";
import { SearchPokemonByName } from "../../../../src/pokemon/application/use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../../../../src/pokemon/application/use-cases/SearchPokemonById";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonId } from "../../../../src/pokemon/domain/value-objects/PokemonId";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/PokemonName";
import { PokemonType } from "../../../../src/pokemon/domain/value-objects/PokemonType";

const mockRepository = {
  findById: jest.fn(),
  findByName: jest.fn(),
};

describe("PokemonFinder", () => {
  let pokemonFinder: PokemonFinder;
  let searchByName: SearchPokemonByName;
  let searchById: SearchPokemonById;
  let mockPokemon: Pokemon;

  beforeEach(() => {
    mockRepository.findById.mockReset();
    mockRepository.findByName.mockReset();

    searchByName = new SearchPokemonByName(mockRepository);
    searchById = new SearchPokemonById(mockRepository);

    mockPokemon = new Pokemon(
      PokemonId.fromNumber(25),
      PokemonName.fromString("pikachu"),
      { front_default: "https://example.com/pikachu.png" },
      [PokemonType.fromString("electric")],
    );

    pokemonFinder = new PokemonFinder(searchByName, searchById);
  });

  it("should call repository.findById for numeric query", async () => {
    mockRepository.findById.mockResolvedValue(mockPokemon);

    const result = await pokemonFinder.findByIdOrName("25");

    expect(mockRepository.findById).toHaveBeenCalledWith(
      PokemonId.fromNumber(25),
    );
    expect(mockRepository.findByName).not.toHaveBeenCalled();
    expect(result).toBe(mockPokemon);
  });

  it("should call repository.findByName for string query", async () => {
    mockRepository.findByName.mockResolvedValue(mockPokemon);

    const result = await pokemonFinder.findByIdOrName("pikachu");

    expect(mockRepository.findByName).toHaveBeenCalledWith(
      PokemonName.fromString("pikachu"),
    );
    expect(mockRepository.findById).not.toHaveBeenCalled();
    expect(result).toBe(mockPokemon);
  });

  it("should return null if repository.findById returns null", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await pokemonFinder.findByIdOrName("999");

    expect(result).toBeNull();
  });

  it("should return null if repository.findByName returns null", async () => {
    mockRepository.findByName.mockResolvedValue(null);

    const result = await pokemonFinder.findByIdOrName("unknown");

    expect(result).toBeNull();
  });
});
