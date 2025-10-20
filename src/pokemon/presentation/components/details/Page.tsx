import { useLocation } from "react-router-dom";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import { PokemonView } from "../../../application/views/PokemonView";
import { PokemonDto } from "../../../application/dtos/PokemonDto";
import "../../styles/details/page.sass";

export function Page() {
  const location = useLocation();
  const cart = usePokemonCart();
  const pokemon = (location.state as { pokemon?: PokemonView })?.pokemon;

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
        onClick={() => cart?.addToCart(PokemonDto.fromPokemonView(pokemon))}
      >
        Catch Pokemon
      </button>
    </div>
  );
}
