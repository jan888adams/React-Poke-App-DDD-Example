import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { Suggestion } from "../../domain/entities/Suggestion";
import { SuggestionRepository } from "../../domain/repositories/SuggestionRepository";

export class CreateSuggestions {
  public constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly suggestionRepository: SuggestionRepository,
  ) {}

  async execute(): Promise<void> {
    if (await this.suggestionRepository.hasSuggestions()) {
      return;
    }

    const names = await this.pokemonRepository.getNames();

    await this.suggestionRepository.save(
      names.map((name) => Suggestion.fromString(name.getValue())),
    );
  }
}
