import { renderHook, act } from "@testing-library/react-hooks";
import { usePokemonSearch } from "../../../../src/pokemon/presentation/hooks/usePokemonSearch";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { pokemonFinder } from "../../../../src/shared/infrastructure/di/DependencyContainer";

jest.mock(
  "../../../../src/shared/infrastructure/di/DependencyContainer",
  () => ({
    pokemonFinder: {
      findByIdOrName: jest.fn(),
    },
  }),
);

const mockPokemon = Pokemon.fromValues(
  25,
  "pikachu",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  ["electric"],
  112,
  4,
  60,
);

describe("usePokemonSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search and set pokemon by name", async () => {
    (pokemonFinder.findByIdOrName as jest.Mock).mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("pikachu");
    });

    expect(result.current.error).toBeNull();
    expect(result.current.pokemon).toBe(mockPokemon);
    expect(result.current.loading).toBe(false);
  });

  it("should search and set pokemon by id", async () => {
    (pokemonFinder.findByIdOrName as jest.Mock).mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("25");
    });

    expect(result.current.error).toBeNull();
    expect(result.current.pokemon).toBe(mockPokemon);
    expect(result.current.loading).toBe(false);
  });

  it("should set error when pokemon not found", async () => {
    (pokemonFinder.findByIdOrName as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("unknown");
    });

    expect(result.current.error).toBe('Pokemon "unknown" not found');
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set error on exception", async () => {
    (pokemonFinder.findByIdOrName as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );
    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("pikachu");
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets error if query is empty", async () => {
    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("");
    });

    expect(result.current.error).toBe("Please enter a Pokemon ID or name");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
