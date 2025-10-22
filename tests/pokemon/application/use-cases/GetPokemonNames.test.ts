import { GetPokemonNames } from "../../../../src/pokemon/application/use-cases/GetPokemonNames";
import { PokemonRepository } from "../../../../src/pokemon/domain/repositories/PokemonRepository";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonName";

describe("GetPokemonNames", () => {
  let mockPokemonRepository: jest.Mocked<PokemonRepository>;
  let getPokemonNames: GetPokemonNames;

  beforeEach(() => {
    mockPokemonRepository = {
      getNames: jest.fn(),
    } as unknown as jest.Mocked<PokemonRepository>;

    getPokemonNames = new GetPokemonNames(mockPokemonRepository);
  });

  it("should return a list of Pokémon names", async () => {
    const mockNames = [
      PokemonName.fromString("Bulbasaur"),
      PokemonName.fromString("Ivysaur"),
      PokemonName.fromString("Venusaur"),
    ];

    mockPokemonRepository.getNames.mockResolvedValue(mockNames);

    const result = await getPokemonNames.execute();

    expect(result).toEqual(["bulbasaur", "ivysaur", "venusaur"]);
    expect(mockPokemonRepository.getNames).toHaveBeenCalledTimes(1);
  });

  it("should return an empty list if no Pokémon names are found", async () => {
    mockPokemonRepository.getNames.mockResolvedValue([]);

    const result = await getPokemonNames.execute();

    expect(result).toEqual([]);
    expect(mockPokemonRepository.getNames).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the repository call fails", async () => {
    mockPokemonRepository.getNames.mockRejectedValue(
      new Error("Repository error"),
    );

    await expect(getPokemonNames.execute()).rejects.toThrow("Repository error");
    expect(mockPokemonRepository.getNames).toHaveBeenCalledTimes(1);
  });
});
