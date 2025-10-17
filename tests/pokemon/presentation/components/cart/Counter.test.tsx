import { render, screen } from "@testing-library/react";
import { Counter } from "../../../../../src/pokemon/presentation/components/cart/Counter";
import * as useCartModule from "../../../../../src/pokemon/presentation/hooks/usePokemonCart";

jest.mock(
  "../../../../../src/pokemon/presentation/hooks/usePokemonCart",
  () => ({
    usePokemonCart: jest.fn(),
  }),
);

const usePokemonCart = useCartModule.usePokemonCart as jest.Mock;

describe("Counter", () => {
  it("should show the correct number of items in the cart", () => {
    usePokemonCart.mockReturnValue({ cartItems: [{}, {}, {}] });
    render(<Counter />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should show 0 when cart is empty", () => {
    usePokemonCart.mockReturnValue({ cartItems: [] });
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should show 0 when cart is undefined", () => {
    usePokemonCart.mockReturnValue(undefined);
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
