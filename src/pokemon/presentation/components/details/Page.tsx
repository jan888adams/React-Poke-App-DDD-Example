import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import { PokemonView } from "../../../application/views/PokemonView";
import { PokemonDto } from "../../../application/dtos/PokemonDto";
import { Accordion } from "./Accordion";
import { useGetPokemonMoves } from "../../hooks/useGetPokemonMoves";
import { useGetPokemonAbilities } from "../../hooks/useGetPokemonAbilities";
import { MoveView } from "../../../application/views/MoveView";
import { AbilityView } from "../../../application/views/AbilityView";
import "../../styles/details/page.sass";

export const Page: React.FC = () => {
  const location = useLocation();
  const { cart, addToCart } = usePokemonCart();
  const pokemon = (location.state as { pokemon?: PokemonView })?.pokemon;

  const [showMoves, setShowMoves] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);

  const moves = useGetPokemonMoves(showMoves ? (pokemon ?? null) : null);
  const abilities = useGetPokemonAbilities(
    showAbilities ? (pokemon ?? null) : null,
  );

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
      <div className="experience-bars">
        <div className="experience-bar">
          <div
            className="experience-bar__fill"
            style={{ width: `${Math.min(pokemon.height * 10, 100)}%` }}
          />
          <span className="experience-bar__label">
            Height: {pokemon.height}
          </span>
        </div>
        <div className="experience-bar">
          <div
            className="experience-bar__fill"
            style={{ width: `${Math.min(pokemon.weight / 2, 100)}%` }}
          />
          <span className="experience-bar__label">
            Weight: {pokemon.weight}
          </span>
        </div>
        <div className="experience-bar">
          <div
            className="experience-bar__fill"
            style={{ width: `${Math.min(pokemon.baseExperience / 3, 100)}%` }}
          />
          <span className="experience-bar__label">
            Base Experience: {pokemon.baseExperience}
          </span>
        </div>
      </div>
      <button
        className="detail-page__add-to-cart"
        onClick={() => addToCart(PokemonDto.fromPokemonView(pokemon))}
        disabled={cart?.has(pokemon.id)}
      >
        Catch Pokemon
      </button>

      <div className="accordion-row">
        <Accordion
          title="Moves"
          isOpen={showMoves}
          onToggle={() => setShowMoves((open) => !open)}
          items={moveItems}
          columns={MoveView.fields}
        />
        <Accordion
          title="Abilities"
          isOpen={showAbilities}
          onToggle={() => setShowAbilities((open) => !open)}
          items={abilityItems}
          columns={AbilityView.fields}
        />
      </div>
    </div>
  );
};
