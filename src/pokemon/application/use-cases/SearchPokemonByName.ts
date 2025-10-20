import { PokemonName } from "../../domain/value-objects/PokemonName";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonView } from "../views/PokemonView";

export class SearchPokemonByName {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(name: string): Promise<PokemonView | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Pokemon name cannot be empty");
    }

    const pokemonName = PokemonName.fromString(name);
    const $pokemon = await this.pokemonRepository.findByName(pokemonName);

    return $pokemon ? PokemonView.fromPokemon($pokemon) : null;
  }
}
