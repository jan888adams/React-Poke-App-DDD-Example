import { PokemonRepository } from "../../domain/repositories/PokemonRepository";

export class GetPokemonNames {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(): Promise<string[]> {
    const names = await this.pokemonRepository.getNames();

    return names.map((name) => name.getValue());
  }
}
