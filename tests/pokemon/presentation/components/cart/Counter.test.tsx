import { render, screen } from "@testing-library/react";
import { Counter } from "../../../../../src/pokemon/presentation/components/cart/Counter";
import * as useCartModule from "../../../../../src/pokemon/presentation/hooks/useCart";

jest.mock("../../../../../src/pokemon/presentation/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

const useCart = useCartModule.useCart as jest.Mock;

describe("Counter", () => {
  it("should show the correct number of items in the cart", () => {
    useCart.mockReturnValue({ cartItems: [{}, {}, {}] }); // 3 items
    render(<Counter />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should show 0 when cart is empty", () => {
    useCart.mockReturnValue({ cartItems: [] });
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should show 0 when cart is undefined", () => {
    useCart.mockReturnValue(undefined);
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
