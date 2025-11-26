import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Grid } from "../../../../../src/pokemon/presentation/components/pokedex/Grid";
import { useGetPokemons } from "../../../../../src/pokemon/presentation/hooks/useGetPokemons";

jest.mock("../../../../../src/pokemon/presentation/hooks/useGetPokemons");

const mockUseGetPokemons = useGetPokemons as jest.MockedFunction<
  typeof useGetPokemons
>;

describe("Grid Component", () => {
  const mockPokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      imageUrl: "https://example.com/bulbasaur.png",
      altText: "Bulbasaur",
      types: ["grass", "poison"],
      baseExperience: 64,
      height: 7,
      weight: 69,
      abilities: [24],
      moves: [23],
    },
    {
      id: 2,
      name: "Ivysaur",
      imageUrl: "https://example.com/ivysaur.png",
      altText: "Ivysaur",
      types: ["grass", "poison"],
      baseExperience: 142,
      height: 10,
      weight: 130,
      abilities: [23],
      moves: [24],
    },
    {
      id: 3,
      name: "Charmander",
      imageUrl: "https://example.com/charmander.png",
      altText: "Charmander",
      types: ["fire"],
      baseExperience: 62,
      height: 6,
      weight: 85,
      abilities: [23],
      moves: [24],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Grid />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: [],
      loading: false,
      error: "Failed to fetch data",
    });

    render(
      <MemoryRouter>
        <Grid />
      </MemoryRouter>,
    );

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("displays Pokémon data", () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Grid />
      </MemoryRouter>,
    );

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByAltText(pokemon.altText)).toBeInTheDocument();
    });
  });

  it("handles sorting by name (ascending)", async () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Grid />
      </MemoryRouter>,
    );

    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "name-asc" } });

    await waitFor(() => {
      const pokemonNames = screen
        .getAllByText(/Bulbasaur|Ivysaur|Charmander/)
        .map((el) => el.textContent);
      expect(pokemonNames).toEqual(["Bulbasaur", "Charmander", "Ivysaur"]);
    });
  });

  it("handles sorting by ID (descending)", async () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Grid />
      </MemoryRouter>,
    );

    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "id-desc" } });

    await waitFor(() => {
      const pokemonNames = screen
        .getAllByText(/Bulbasaur|Ivysaur|Charmander/)
        .map((el) => el.textContent);
      expect(pokemonNames).toEqual(["Charmander", "Ivysaur", "Bulbasaur"]);
    });
  });

  it("handles pagination", () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/pokedex?page=1"]}>
        <Routes>
          <Route path="/pokedex" element={<Grid />} />
        </Routes>
      </MemoryRouter>,
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });
});
