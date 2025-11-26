import { Pokemon } from "../../domain/entities/Pokemon";
import { SearchPokemonByName } from "../use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../use-cases/SearchPokemonById";

export class PokemonFinder {
  constructor(
    private readonly searchPokemonByName: SearchPokemonByName,
    private readonly searchPokemonById: SearchPokemonById,
  ) {}

  async findByIdOrName(query: string): Promise<Pokemon | null> {
    const numericId = parseInt(query);

    if (!isNaN(numericId) && numericId > 0) {
      return await this.searchPokemonById.execute(numericId);
    } else {
      return await this.searchPokemonByName.execute(query);
    }
  }
}
