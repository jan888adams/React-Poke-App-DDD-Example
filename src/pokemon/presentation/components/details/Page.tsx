import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import { PokemonView } from "../../../application/views/PokemonView";
import { PokemonDto } from "../../../application/dtos/PokemonDto";
import { Accordion } from "./Accordion";
import { useGetPokemonMoves } from "../../hooks/useGetPokemonMoves";
import { useGetPokemonAbilities } from "../../hooks/useGetPokemonAbilities";

export const Page: React.FC = () => {
  const location = useLocation();
  const { cart, addToCart } = usePokemonCart();
  const pokemon = (location.state as { pokemon?: PokemonView })?.pokemon;

  const [showMoves, setShowMoves] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);

  const moves = useGetPokemonMoves(showMoves ? pokemon : undefined);
  const abilities = useGetPokemonAbilities(showAbilities ? pokemon : undefined);

  const moveItems: string[][] = moves.map((move) => [
    move.name,
    move.accuracy,
    move.effectChance,
    move.pp,
    move.priority,
    move.power,
    move.damageClass,
  ]);

  const abilityItems: string[][] = abilities.map((ability) => [
    ability.name,
    ability.generation,
    ability.effect,
  ]);

  if (!pokemon) {
    return <div>No Pokemon data provided.</div>;
  }

  return (
    <div className="detail-page">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.imageUrl ?? ""} alt={pokemon.altText} />
      <p>Base Experience: {pokemon.baseExperience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.join(", ")}</p>
      <button
        className="detail-page__add-to-cart"
        onClick={() => addToCart(PokemonDto.fromPokemonView(pokemon))}
        disabled={cart?.has(pokemon.id)}
      >
        Catch Pokemon
      </button>

      <Accordion
        title="Abilities"
        isOpen={showAbilities}
        onToggle={() => setShowAbilities((prev) => !prev)}
        columns={["Name", "Generation", "Effect"]}
        items={abilityItems}
      />

      <Accordion
        title="Moves"
        isOpen={showMoves}
        onToggle={() => setShowMoves((prev) => !prev)}
        columns={[
          "Name",
          "Accuracy",
          "Effect Chance",
          "PP",
          "Priority",
          "Power",
          "Damage Class",
        ]}
        items={moveItems}
      />
    </div>
  );
};
