import { render, screen } from "@testing-library/react";
import { SearchBar } from "../../../../../src/pokemon/presentation/components/search/SearchBar";
import { Pokemon } from "../../../../../src/pokemon/domain/entities/Pokemon";
import { usePokemonSearch } from "../../../../../src/pokemon/presentation/hooks/usePokemonSearch";

jest.mock(
  "../../../../../src/pokemon/presentation/components/search/Form",
  () => ({
    __esModule: true,
    Form: ({ onSubmit }: { onSubmit: (value: string) => void }) => (
      <button onClick={() => onSubmit("pikachu")}>Search</button>
    ),
  }),
);
jest.mock(
  "../../../../../src/pokemon/presentation/components/search/Card",
  () => ({
    __esModule: true,
    Card: ({ pokemon }: { pokemon: Pokemon }) => (
      <div>Card: {pokemon.getName()}</div>
    ),
  }),
);
jest.mock("../../../../../src/pokemon/presentation/hooks/usePokemonSearch");

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Card when pokemon is present", () => {
    (usePokemonSearch as jest.Mock).mockReturnValue({
      pokemon: { getName: () => "pikachu" },
      searchPokemon: jest.fn(),
      error: null,
      loading: false,
    });

    render(<SearchBar />);
    expect(screen.getByText("Card: pikachu")).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    (usePokemonSearch as jest.Mock).mockReturnValue({
      pokemon: null,
      searchPokemon: jest.fn(),
      error: "Pokemon not found",
      loading: false,
    });

    render(<SearchBar />);
    expect(screen.getByText("Pokemon not found")).toBeInTheDocument();
  });

  it("renders loading message when loading is true", () => {
    (usePokemonSearch as jest.Mock).mockReturnValue({
      pokemon: null,
      searchPokemon: jest.fn(),
      error: null,
      loading: true,
    });

    render(<SearchBar />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
