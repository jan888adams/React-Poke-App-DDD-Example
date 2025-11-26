import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonView } from "../views/PokemonView";

export class GetPokemons {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(page: number, number: number): Promise<PokemonView[]> {
    if (number <= 0) {
      throw new Error("The number of Pokemons must be greater than 0");
    }

    if (page <= 0) {
      throw new Error("The page number must be greater than 0");
    }

    const $pokemons = await this.pokemonRepository.getAll(page, number);

    return $pokemons.map(PokemonView.fromPokemon);
  }
}
