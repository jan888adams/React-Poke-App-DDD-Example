import { Suggestion } from "../../domain/entities/Suggestion";
import { SuggestionRepository } from "../../domain/repositories/SuggestionRepository";
import { SuggestionSearchAdapter } from "../adapters/SuggestionSearchAdapter";

export class SuggestionLocalStorageRepository implements SuggestionRepository {
  private readonly storageKey = "pokemon_suggestions";

  constructor(
    private readonly searchAdapter: SuggestionSearchAdapter,
    private readonly storage: Storage = window.localStorage,
  ) {
    this.loadFromStorage();
  }

  public async saveSuggestions(suggestions: Suggestion[]): Promise<void> {
    this.searchAdapter.saveSuggestions(suggestions);
    this.saveToStorage();
  }

  public async search(value: string): Promise<Suggestion[]> {
    return this.searchAdapter.findSuggestions(value);
  }

  public async hasSuggestions(): Promise<boolean> {
    const storedData = this.storage.getItem(this.storageKey);
    return storedData !== null;
  }

  private saveToStorage(): void {
    const allSuggestions = this.searchAdapter.findSuggestions("");
    const dataToStore = allSuggestions.map((suggestion) => ({
      id: suggestion.id.getValue(),
      name: suggestion.name.getValue(),
    }));

    this.storage.setItem(this.storageKey, JSON.stringify(dataToStore));
  }

  private loadFromStorage(): void {
    const storedData = this.storage.getItem(this.storageKey);
    if (storedData) {
      const suggestions: { id: string; name: string }[] =
        JSON.parse(storedData);
      const suggestionEntities = suggestions.map((data) =>
        Suggestion.fromObject(data),
      );
      this.searchAdapter.saveSuggestions(suggestionEntities);
    }
  }
}
