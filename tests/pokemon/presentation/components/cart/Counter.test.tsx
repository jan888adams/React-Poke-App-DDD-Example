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
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show the correct number of items in the cart", () => {
    usePokemonCart.mockReturnValue({
      cart: {
        items: [{}, {}, {}],
        count: () => 3,
        isEmpty: () => false,
      },
    });
    render(<Counter />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should show 0 when cart is empty", () => {
    usePokemonCart.mockReturnValue({
      cart: {
        items: [],
        count: () => 0,
        isEmpty: () => true,
      },
    });
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
