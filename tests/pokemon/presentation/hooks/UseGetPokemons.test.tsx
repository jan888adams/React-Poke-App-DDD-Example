import { renderHook } from "@testing-library/react-hooks";
import { useGetPokemons } from "../../../../src/pokemon/presentation/hooks/useGetPokemons";
import { getPokemons } from "../../../../src/shared/infrastructure/di/DependencyContainer";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";

jest.mock("../../../../src/shared/infrastructure/di/DependencyContainer");

describe("useGetPokemons", () => {
  const mockPokemons: Pokemon[] = [
    Pokemon.fromValues(
      1,
      "Bulbasaur",
      "https://example.com/bulbasaur.png",
      ["grass", "poison"],
      64,
      7,
      69,
    ),
    Pokemon.fromValues(
      2,
      "Ivysaur",
      "https://example.com/ivysaur.png",
      ["grass", "poison"],
      142,
      10,
      130,
    ),
  ];

  const mockPokemonViews: PokemonView[] = mockPokemons.map(
    PokemonView.fromPokemon,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches Pokémon data successfully", async () => {
    (getPokemons.execute as jest.Mock).mockResolvedValue(mockPokemonViews);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetPokemons(1, 30),
    );

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual(mockPokemonViews);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(getPokemons.execute).toHaveBeenCalledWith(1, 30);
  });

  it("handles errors during fetch", async () => {
    (getPokemons.execute as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch Pokémon"),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetPokemons(1, 30),
    );

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch Pokémon");

    expect(getPokemons.execute).toHaveBeenCalledWith(1, 30);
  });

  it("fetches new data when page or limit changes", async () => {
    (getPokemons.execute as jest.Mock).mockResolvedValue(mockPokemonViews);

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ page, limit }) => useGetPokemons(page, limit),
      { initialProps: { page: 1, limit: 30 } },
    );

    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual(mockPokemonViews);
    expect(getPokemons.execute).toHaveBeenCalledWith(1, 30);

    (getPokemons.execute as jest.Mock).mockResolvedValue([]);
    rerender({ page: 2, limit: 30 });

    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual([]);
    expect(getPokemons.execute).toHaveBeenCalledWith(2, 30);
  });
});
