import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../../../../src/pokemon/presentation/components/search/SearchBar";
import { usePokemonSearch } from "../../../../../src/pokemon/presentation/hooks/usePokemonSearch";
import { PokemonView } from "../../../../../src/pokemon/application/views/PokemonView";

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
    Card: ({ pokemon }: { pokemon: PokemonView }) => (
      <div>Card: {pokemon.name}</div>
    ),
  }),
);
jest.mock("../../../../../src/pokemon/presentation/hooks/usePokemonSearch");
jest.mock(
  "../../../../../src/pokemon/presentation/assets/open-pokeball.png",
  () => "test-file-stub",
);
jest.mock(
  "../../../../../src/shared/presentation/assets/pokemon-loading.mp4",
  () => "test-file-stub",
);

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Card when pokemon is present", async () => {
    (usePokemonSearch as jest.Mock).mockReturnValue({
      pokemon: { name: "pikachu" },
      searchPokemon: jest.fn(),
      error: null,
      loading: false,
    });

    render(<SearchBar />);
    userEvent.click(screen.getByText("Search")); // simulate search
    expect(await screen.findByText("Card: pikachu")).toBeInTheDocument();
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
});
