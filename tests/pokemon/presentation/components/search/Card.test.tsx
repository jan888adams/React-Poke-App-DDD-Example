import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Card } from "../../../../../src/pokemon/presentation/components/search/Card";
import { Pokemon } from "../../../../../src/pokemon/domain/entities/Pokemon";

const mockPokemon = Pokemon.fromValues(
  25,
  "pikachu",
  "https://example.com/pikachu.png",
  ["electric"],
  112,
  4,
  60,
);

describe("Card", () => {
  it("renders Pokemon data", () => {
    render(
      <BrowserRouter>
        <Card pokemon={mockPokemon} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png",
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "pikachu");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Pikachu",
    );
    expect(screen.getByText("ID: #25")).toBeInTheDocument();
    expect(screen.getByText("Types: electric")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/pokemon/25",
    );
  });
});
