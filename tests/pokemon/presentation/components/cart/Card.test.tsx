import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../../../../../src/pokemon/presentation/components/cart/Card";
import { usePokemonCart } from "../../../../../src/pokemon/presentation/hooks/usePokemonCart";
import { useNavigate } from "react-router-dom";
import { PokemonView } from "../../../../../src/pokemon/application/views/PokemonView";
import { Pokemon } from "../../../../../src/pokemon/domain/entities/Pokemon";

jest.mock("../../../../../src/pokemon/presentation/hooks/usePokemonCart");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Card Component", () => {
  const mockCloseModal = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockNavigate = jest.fn();

  const mockPokemon = PokemonView.fromPokemon(
    Pokemon.fromValues(
      25,
      "Pikachu",
      "https://example.com/pikachu.png",
      ["electric"],
      112,
      4,
      60,
      [{ id: 12 }],
      [{ id: 34 }],
    ),
  );

  beforeEach(() => {
    jest.clearAllMocks();
    (usePokemonCart as jest.Mock).mockReturnValue({
      cart: { items: [mockPokemon] },
      removeFromCart: mockRemoveFromCart,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders the Pokémon card with correct details", () => {
    render(<Card pokemon={mockPokemon} closeModal={mockCloseModal} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png",
    );
  });

  it("navigates to the Pokémon detail page when the card is clicked", () => {
    render(<Card pokemon={mockPokemon} closeModal={mockCloseModal} />);

    const card = screen
      .getByRole("button", { name: /Remove from Cart/i })
      .closest("div");
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith(`/pokemon/25`, {
      state: { pokemon: mockPokemon },
    });
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("closes the modal if the last Pokémon is removed", () => {
    (usePokemonCart as jest.Mock).mockReturnValue({
      cart: { items: [mockPokemon] },
      removeFromCart: mockRemoveFromCart,
    });

    render(<Card pokemon={mockPokemon} closeModal={mockCloseModal} />);

    const removeButton = screen.getByRole("button", {
      name: /Remove from Cart/i,
    });
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockPokemon);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
