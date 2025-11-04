import { render, screen } from "@testing-library/react";
import { CartModal } from "../../../../../src/pokemon/presentation/components/cart/Modal";
import { CartView } from "../../../../../src/pokemon/application/views/CartView";
import { Cart } from "../../../../../src/pokemon/domain/entities/Cart";
import { PokemonView } from "../../../../../src/pokemon/application/views/PokemonView";
import { Pokemon } from "../../../../../src/pokemon/domain/entities/Pokemon";

jest.mock(
  "../../../../../src/pokemon/presentation/components/cart/Card",
  () => ({
    Card: ({
      pokemon,
      closeModal,
    }: {
      pokemon: PokemonView;
      closeModal: () => void;
    }) => (
      <div data-testid="pokemon-card">
        <p>{pokemon.name}</p>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    ),
  }),
);

describe("CartModal Component", () => {
  const mockOnRequestClose = jest.fn();

  const cart = Cart.empty();
  cart.add(
    Pokemon.fromValues(
      25,
      "Pikachu",
      "https://example.com/pikachu.png",
      ["electric"],
      112,
      4,
      60,
      [{ id: 26 }],
      [{ id: 84 }],
    ),
  );
  cart.add(
    Pokemon.fromValues(
      1,
      "Bulbasaur",
      "https://example.com/bulbasaur.png",
      ["grass", "poison"],
      64,
      7,
      69,
      [{ id: 12 }],
      [{ id: 34 }],
    ),
  );

  const mockCart = CartView.fromCart(cart);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with the correct content when open", () => {
    render(
      <CartModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        cart={mockCart}
      />,
    );

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getAllByTestId("pokemon-card")).toHaveLength(2);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("does not render the modal when closed", () => {
    render(
      <CartModal
        isOpen={false}
        onRequestClose={mockOnRequestClose}
        cart={mockCart}
      />,
    );

    expect(screen.queryByText("Cart")).not.toBeInTheDocument();
  });

  it("passes the correct props to the Card component", () => {
    render(
      <CartModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        cart={mockCart}
      />,
    );

    const pikachuCard = screen.getByText("Pikachu");
    expect(pikachuCard).toBeInTheDocument();

    const bulbasaurCard = screen.getByText("Bulbasaur");
    expect(bulbasaurCard).toBeInTheDocument();
  });
});
