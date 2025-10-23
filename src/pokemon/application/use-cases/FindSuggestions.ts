import { SuggestionRepository } from "../../domain/repositories/SuggestionRepository";

export class FindSuggestions {
  constructor(private readonly suggestionRepository: SuggestionRepository) {}

  async execute(prefix: string): Promise<string[]> {
    if (!prefix) {
      throw new Error("Prefix must be a non-empty string");
    }

    const suggestions = await this.suggestionRepository.search(prefix);

    return suggestions.map((suggestion) => suggestion.name.getValue());
  }
}
