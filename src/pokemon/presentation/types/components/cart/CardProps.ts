import { PokemonView } from "../../../../application/views/PokemonView";

export type CardProps = {
  pokemon: PokemonView;
  closeModal: () => void;
};
