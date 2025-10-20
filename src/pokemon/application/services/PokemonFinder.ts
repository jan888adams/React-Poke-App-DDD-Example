import { SearchPokemonByName } from "../use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../use-cases/SearchPokemonById";
import { PokemonView } from "../views/PokemonView";

export class PokemonFinder {
  constructor(
    private readonly searchPokemonByName: SearchPokemonByName,
    private readonly searchPokemonById: SearchPokemonById,
  ) {}

  async findByIdOrName(query: string): Promise<PokemonView | null> {
    const numericId = parseInt(query);

    if (!isNaN(numericId) && numericId > 0) {
      return await this.searchPokemonById.execute(numericId);
    } else {
      return await this.searchPokemonByName.execute(query);
    }
  }
}
