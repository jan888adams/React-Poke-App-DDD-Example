import { PokemonView } from "../../../application/views/PokemonView";

export type SearchResult = {
  pokemon: PokemonView | null;
  loading: boolean;
  error: string | null;
  searchPokemon: (query: string) => Promise<void>;
};
