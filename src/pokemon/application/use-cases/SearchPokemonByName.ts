import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonName } from "../../domain/value-objects/PokemonName";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";

export class SearchPokemonByName {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(name: string): Promise<Pokemon | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Pokemon name cannot be empty");
    }

    const pokemonName = new PokemonName(name.trim());
    return await this.pokemonRepository.findByName(pokemonName);
  }
}
