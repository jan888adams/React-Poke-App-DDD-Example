import { useLocation } from "react-router-dom";
import { Pokemon } from "../../../domain/entities/Pokemon";
import { SerializedPokemon } from "../../../infrastructure/dtos/SerializedPokemon";
import "../../styles/details/page.sass";

export function Page() {
  const location = useLocation();
  const serializedPokemon = (location.state as { pokemon?: SerializedPokemon })
    ?.pokemon;

  if (!serializedPokemon) {
    return <div>No Pokemon data provided.</div>;
  }

  const pokemon = Pokemon.fromValues(
    serializedPokemon.id.value,
    serializedPokemon.name.value,
    serializedPokemon.sprites?.front_default ?? null,
    serializedPokemon.types?.map((t) => t.value) ?? [],
    serializedPokemon.baseExperience.value,
    serializedPokemon.height.value,
    serializedPokemon.weight.value,
  );

  return (
    <div className="detail-page">
      <h1>{pokemon.getName()}</h1>
      <img src={pokemon.getImageUrl() ?? ""} alt={pokemon.getName()} />
      <p>Base Experience: {pokemon.getBaseExperience()}</p>
      <p>Height: {pokemon.getHeight()}</p>
      <p>Weight: {pokemon.getWeight()}</p>
      <p>Types: {pokemon.getTypes().join(", ")}</p>
    </div>
  );
}
