import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Card } from "../../../../../src/pokemon/presentation/components/search/Card";
import { Pokemon } from "../../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonView } from "../../../../../src/pokemon/application/views/PokemonView";

const mockPokemon = Pokemon.fromValues(
  25,
  "pikachu",
  "https://example.com/pikachu.png",
  ["electric"],
  112,
  4,
  60,
  [{ id: 12 }],
  [{ id: 34 }],
);

const pokemonView = PokemonView.fromPokemon(mockPokemon);

describe("Card", () => {
  it("renders Pokemon data", () => {
    render(
      <BrowserRouter>
        <Card pokemon={pokemonView} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png",
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "pikachu");
    expect(
      screen.getByText(
        (content) => content.includes("ID:") && content.includes("25"),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Types: electric")).toBeInTheDocument();
  });
});
