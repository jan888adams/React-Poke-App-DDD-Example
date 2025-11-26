import { PokemonRepository } from "../../domain/repositories/PokemonRepository";

export class GetPokemonNames {
  public constructor(private readonly pokemonRepository: PokemonRepository) {}

  public async execute(): Promise<string[]> {
    const names = await this.pokemonRepository.getNames();

    return names.map((name) => name.getValue());
  }
}
