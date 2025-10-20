import { PokemonView } from "../../../application/views/PokemonView";
import { usePokemonCart } from "../../hooks/usePokemonCart";
import "../../styles/cart/card.sass";

type Props = {
  pokemon: PokemonView;
  onLastItemRemoved: () => void;
};

export function Card({ pokemon, onLastItemRemoved }: Props) {
  const { cart, removeFromCart } = usePokemonCart();

  const handleRemove = () => {
    removeFromCart(pokemon);

    if (cart.items.length === 1) {
      onLastItemRemoved();
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-card__content">
        <img
          className="pokemon-card__image"
          src={pokemon.imageUrl || ""}
          alt={pokemon.altText}
        />
        <h2 className="pokemon-card__name">{pokemon.name}</h2>
      </div>
      <button
        className="pokemon-card__remove"
        onClick={handleRemove}
        aria-label="Remove from Cart"
      >
        <img
          src="/open-pokeball.png"
          alt="Remove from Cart"
          className="pokemon-card__remove-icon"
        />
      </button>
    </div>
  );
}
