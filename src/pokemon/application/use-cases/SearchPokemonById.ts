import { PokemonId } from "../../domain/value-objects/pokemon/PokemonId";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonView } from "../views/PokemonView";

export class SearchPokemonById {
  public constructor(private readonly pokemonRepository: PokemonRepository) {}

  public async execute(id: number): Promise<PokemonView | null> {
    if (id <= 0) {
      throw new Error("Pokemon ID must be greater than 0");
    }

    const pokemonId = PokemonId.fromNumber(id);

    const $pokemon = await this.pokemonRepository.findById(pokemonId);

    return $pokemon ? PokemonView.fromPokemon($pokemon) : null;
  }
}
