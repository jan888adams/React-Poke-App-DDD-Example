import { renderHook, act } from "@testing-library/react";
import { usePokemonSearch } from "../../../../src/pokemon/presentation/hooks/usePokemonSearch";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";
import {
  searchPokemonById,
  searchPokemonByName,
} from "../../../../src/shared/infrastructure/di/DependencyContainer";

jest.mock(
  "../../../../src/shared/infrastructure/di/DependencyContainer",
  () => ({
    searchPokemonById: { execute: jest.fn() },
    searchPokemonByName: { execute: jest.fn() },
  }),
);

describe("usePokemonSearch", () => {
  const mockPokemon: PokemonView = {
    id: 25,
    name: "Pikachu",
    imageUrl: "https://example.com/pikachu.png",
    altText: "pikachu",
    types: ["electric"],
    baseExperience: 112,
    height: 4,
    weight: 60,
    abilities: [12],
    moves: [34],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => usePokemonSearch());

    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("searches for a Pokemon by ID", async () => {
    (searchPokemonById.execute as jest.Mock).mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("25");
    });

    expect(searchPokemonById.execute).toHaveBeenCalledWith(25);
    expect(result.current.pokemon).toEqual(mockPokemon);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("searches for a Pokemon by name", async () => {
    (searchPokemonByName.execute as jest.Mock).mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("Pikachu");
    });

    expect(searchPokemonByName.execute).toHaveBeenCalledWith("Pikachu");
    expect(result.current.pokemon).toEqual(mockPokemon);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles empty query input", async () => {
    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("");
    });

    expect(result.current.error).toBe("Please enter a Pokemon ID or name");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles a non-existent Pokemon", async () => {
    (searchPokemonByName.execute as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("UnknownPokemon");
    });

    expect(searchPokemonByName.execute).toHaveBeenCalledWith("UnknownPokemon");
    expect(result.current.error).toBe('Pokemon "UnknownPokemon" not found');
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles errors during search", async () => {
    (searchPokemonById.execute as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current.searchPokemon("25");
    });

    expect(searchPokemonById.execute).toHaveBeenCalledWith(25);
    expect(result.current.error).toBe("Network error");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets loading state correctly during search", async () => {
    (searchPokemonById.execute as jest.Mock).mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonSearch());

    act(() => {
      result.current.searchPokemon("25");
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.searchPokemon("25");
    });

    expect(result.current.loading).toBe(false);
  });
});
