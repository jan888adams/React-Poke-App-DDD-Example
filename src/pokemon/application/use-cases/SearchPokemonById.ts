import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonId } from "../../domain/value-objects/PokemonId";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";

export class SearchPokemonById {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(id: number): Promise<Pokemon | null> {
    if (id <= 0) {
      throw new Error("Pokemon ID must be greater than 0");
    }

    const pokemonId = PokemonId.fromNumber(id);
    return await this.pokemonRepository.findById(pokemonId);
  }
}
