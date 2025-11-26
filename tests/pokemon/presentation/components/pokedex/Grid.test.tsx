import { render, screen, fireEvent } from "@testing-library/react";
import { Grid } from "../../../../../src/pokemon/presentation/components/pokedex/Grid";
import { useGetPokemons } from "../../../../../src/pokemon/presentation/hooks/useGetPokemons";
import { useSearchParams, useNavigate } from "react-router-dom";

jest.mock("../../../../../src/pokemon/presentation/hooks/useGetPokemons");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Grid Component", () => {
  const mockNavigate = jest.fn();
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("?page=1"),
      mockSetSearchParams,
    ]);
  });

  it("renders loading state", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: true,
      error: null,
    });

    render(<Grid />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: "Failed to fetch Pokémon",
    });

    render(<Grid />);

    expect(screen.getByText("Failed to fetch Pokémon")).toBeInTheDocument();
  });

  it("renders Pokémon grid", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [
        {
          id: 1,
          name: "Bulbasaur",
          imageUrl: "https://example.com/bulbasaur.png",
        },
        { id: 2, name: "Ivysaur", imageUrl: "https://example.com/ivysaur.png" },
      ],
      loading: false,
      error: null,
    });

    render(<Grid />);

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Ivysaur")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("navigates to the next page", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
    });

    render(<Grid />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: "2" });
  });

  it("navigates to the previous page", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("?page=2"),
      mockSetSearchParams,
    ]);
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
    });

    render(<Grid />);

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: "1" });
  });

  it("disables the previous button on the first page", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
    });

    render(<Grid />);

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("navigates back to the search page", () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
    });

    render(<Grid />);

    const backButton = screen.getByText("Back to Search");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
