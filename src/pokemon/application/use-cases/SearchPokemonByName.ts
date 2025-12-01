import { PokemonName } from "../../domain/value-objects/pokemon/PokemonName";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonView } from "../views/PokemonView";

export class SearchPokemonByName {
  public constructor(private readonly pokemonRepository: PokemonRepository) {}

  public async execute(name: string): Promise<PokemonView | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Pokemon name cannot be empty");
    }

    const pokemonName = PokemonName.fromString(name);
    const $pokemon = await this.pokemonRepository.findByName(pokemonName);

    return $pokemon ? PokemonView.fromPokemon($pokemon) : null;
  }
}
