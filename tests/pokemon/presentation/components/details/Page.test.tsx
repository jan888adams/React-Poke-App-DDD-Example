import { render, screen } from "@testing-library/react";
import { Page } from "../../../../../src/pokemon/presentation/components/details/Page";
import * as ReactRouterDom from "react-router-dom";
import * as useCartModule from "../../../../../src/pokemon/presentation/hooks/usePokemonCart";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const mockPokemonLocation = {
  state: {
    pokemon: {
      id: 25,
      name: "pikachu",
      imageUrl: "https://img.com/pikachu.png",
      altText: "pikachu",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    },
  },
};

const mockEmptyLocation = {
  pathname: "",
  search: "",
  hash: "",
  key: "test",
  state: {},
};

describe("Page (Pokemon Detail)", () => {
  const useLocation = ReactRouterDom.useLocation as jest.Mock;

  it("renders pokemon details from location state", () => {
    useLocation.mockImplementation(() => mockPokemonLocation);
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /pikachu/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Base Experience:\s*112/)).toBeInTheDocument();
    expect(screen.getByText(/Height:\s*4/)).toBeInTheDocument();
    expect(screen.getByText(/Weight:\s*60/)).toBeInTheDocument();
    expect(screen.getByText(/Types:\s*electric/)).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://img.com/pikachu.png",
    );
  });

  it("disables 'Catch Pokemon' button if pokemon is already in cart", () => {
    useLocation.mockImplementation(() => mockPokemonLocation);
    const mockCart = {
      has: jest.fn().mockReturnValue(true),
    };

    const mockUsePokemonCart = jest
      .spyOn(useCartModule, "usePokemonCart")
      .mockReturnValue({
        cart: mockCart,
        addToCart: jest.fn(),
      } as unknown as ReturnType<typeof useCartModule.usePokemonCart>);

    render(<Page />);
    const button = screen.getByRole("button", { name: /Catch Pokemon/i });
    expect(button).toBeDisabled();

    mockUsePokemonCart.mockRestore();
  });

  it("renders fallback if no pokemon is provided", () => {
    useLocation.mockImplementation(() => mockEmptyLocation);
    render(<Page />);
    expect(screen.getByText("No Pokemon data provided.")).toBeInTheDocument();
  });
});
