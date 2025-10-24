import { render, screen, fireEvent } from "@testing-library/react";
import { Suggestions } from "../../../../../src/pokemon/presentation/components/search/Suggestions";
import { useFindSuggestions } from "../../../../../src/pokemon/presentation/hooks/useFindSuggestions";

jest.mock("../../../../../src/pokemon/presentation/hooks/useFindSuggestions");

describe("Suggestions", () => {
  const mockUseFindSuggestions = useFindSuggestions as jest.MockedFunction<
    typeof useFindSuggestions
  >;
  const mockSetSuggestions = jest.fn();
  const mockOnSuggestionSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display a loading message when loading", () => {
    mockUseFindSuggestions.mockReturnValue({
      suggestions: [],
      loading: true,
      error: null,
    });

    render(
      <Suggestions
        inputValue="pi"
        onSuggestionSelect={mockOnSuggestionSelect}
        setSuggestions={mockSetSuggestions}
        focusedIndex={-1}
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display an error message when there is an error", () => {
    mockUseFindSuggestions.mockReturnValue({
      suggestions: [],
      loading: false,
      error: "Failed to fetch suggestions",
    });

    render(
      <Suggestions
        inputValue="pi"
        onSuggestionSelect={mockOnSuggestionSelect}
        setSuggestions={mockSetSuggestions}
        focusedIndex={-1}
      />,
    );

    expect(screen.getByText("Failed to fetch suggestions")).toBeInTheDocument();
  });

  it("should display suggestions when available", () => {
    mockUseFindSuggestions.mockReturnValue({
      suggestions: ["pikachu", "pidgey", "pidgeotto"],
      loading: false,
      error: null,
    });

    render(
      <Suggestions
        inputValue="pi"
        onSuggestionSelect={mockOnSuggestionSelect}
        setSuggestions={mockSetSuggestions}
        focusedIndex={1}
      />,
    );

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("pidgey")).toBeInTheDocument();
    expect(screen.getByText("pidgeotto")).toBeInTheDocument();

    const focusedItem = screen.getByText("pidgey");
    expect(focusedItem).toHaveClass("suggestions__item--focused");
  });

  it("should call onSuggestionSelect when a suggestion is clicked", () => {
    mockUseFindSuggestions.mockReturnValue({
      suggestions: ["pikachu", "pidgey", "pidgeotto"],
      loading: false,
      error: null,
    });

    render(
      <Suggestions
        inputValue="pi"
        onSuggestionSelect={mockOnSuggestionSelect}
        setSuggestions={mockSetSuggestions}
        focusedIndex={-1}
      />,
    );

    const suggestion = screen.getByText("pikachu");
    fireEvent.click(suggestion);

    expect(mockOnSuggestionSelect).toHaveBeenCalledWith("pikachu");
  });

  it("should call setSuggestions when suggestions change", () => {
    mockUseFindSuggestions.mockReturnValue({
      suggestions: ["pikachu", "pidgey", "pidgeotto"],
      loading: false,
      error: null,
    });

    render(
      <Suggestions
        inputValue="pi"
        onSuggestionSelect={mockOnSuggestionSelect}
        setSuggestions={mockSetSuggestions}
        focusedIndex={-1}
      />,
    );

    expect(mockSetSuggestions).toHaveBeenCalledWith([
      "pikachu",
      "pidgey",
      "pidgeotto",
    ]);
  });
});
