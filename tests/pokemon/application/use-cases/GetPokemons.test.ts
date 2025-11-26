import { GetPokemons } from "../../../../src/pokemon/application/use-cases/GetPokemons";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";

describe("GetPokemons", () => {
  let mockPokemonRepository: jest.Mocked<PokemonRepository>;
  let getPokemons: GetPokemons;

  beforeEach(() => {
    mockPokemonRepository = {
      findByName: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      getNames: jest.fn(),
    };

    getPokemons = new GetPokemons(mockPokemonRepository);
  });

  it("throws an error if the number of Pokemons is less than or equal to 0", async () => {
    await expect(getPokemons.execute(1, 0)).rejects.toThrow(
      "The number of Pokemons must be greater than 0",
    );
  });

  it("throws an error if the page number is less than or equal to 0", async () => {
    await expect(getPokemons.execute(0, 10)).rejects.toThrow(
      "The page number must be greater than 0",
    );
  });

  it("fetches Pokemons and maps them to PokemonView", async () => {
    const mockPokemons: Pokemon[] = [
      Pokemon.fromValues(
        1,
        "Bulbasaur",
        "https://example.com/bulbasaur.png",
        ["grass", "poison"],
        64,
        7,
        69,
        [{ id: 1 }],
        [{ id: 2 }],
      ),
      Pokemon.fromValues(
        2,
        "Ivysaur",
        "https://example.com/ivysaur.png",
        ["grass", "poison"],
        142,
        10,
        130,
        [{ id: 3 }],
        [{ id: 4 }],
      ),
    ];

    mockPokemonRepository.getAll.mockResolvedValue(mockPokemons);

    const result = await getPokemons.execute(1, 2);

    expect(mockPokemonRepository.getAll).toHaveBeenCalledWith(1, 2);
    expect(result).toEqual(mockPokemons.map(PokemonView.fromPokemon));
  });
});
