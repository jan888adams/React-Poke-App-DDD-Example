import { render, screen } from "@testing-library/react";
import { Page } from "../../../../../src/pokemon/presentation/components/details/Page";
import { SerializedPokemon } from "../../../../../src/pokemon/infrastructure/dtos/SerializedPokemon";
import * as ReactRouterDom from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const mockPokemonLocation = {
  pathname: "",
  search: "",
  hash: "",
  key: "test",
  state: {
    pokemon: {
      id: { value: 25 },
      name: { value: "pikachu" },
      sprites: { front_default: "https://img.com/pikachu.png" },
      types: [{ value: "electric" }],
      baseExperience: { value: 112 },
      height: { value: 4 },
      weight: { value: 60 },
    } as SerializedPokemon,
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
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("Base Experience: 112")).toBeInTheDocument();
    expect(screen.getByText("Height: 4")).toBeInTheDocument();
    expect(screen.getByText("Weight: 60")).toBeInTheDocument();
    expect(screen.getByText("Types: electric")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://img.com/pikachu.png",
    );
  });

  it("renders fallback if no pokemon is provided", () => {
    useLocation.mockImplementation(() => mockEmptyLocation);
    render(<Page />);
    expect(screen.getByText("No Pokemon data provided.")).toBeInTheDocument();
  });
});
