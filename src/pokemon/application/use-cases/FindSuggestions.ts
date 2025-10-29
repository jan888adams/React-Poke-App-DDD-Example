import { SuggestionRepository } from "../../domain/repositories/SuggestionRepository";

export class FindSuggestions {
  public constructor(
    private readonly suggestionRepository: SuggestionRepository,
  ) {}

  public async execute(term: string): Promise<string[]> {
    if (!term) {
      throw new Error("Term must be a non-empty string");
    }

    const suggestions = await this.suggestionRepository.search(term);

    return suggestions.map((suggestion) => suggestion.name.getValue());
  }
}
