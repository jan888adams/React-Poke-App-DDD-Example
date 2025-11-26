import { Suggestion } from "../../domain/entities/Suggestion";
import { SuggestionRepository } from "../../domain/repositories/SuggestionRepository";
import { SuggestionSearchAdapter } from "../adapters/SuggestionSearchAdapter";

export class SuggestionLocalStorageRepository implements SuggestionRepository {
  public constructor(
    private readonly searchAdapter: SuggestionSearchAdapter,
    private readonly key: string,
    private readonly storage: Storage = window.localStorage,
  ) {
    this.load();
  }

  public async save(suggestions: Suggestion[]): Promise<void> {
    this.searchAdapter.load(suggestions);
    this.dump();
  }

  public async search(term: string): Promise<Suggestion[]> {
    return this.searchAdapter.find(term);
  }

  public async hasSuggestions(): Promise<boolean> {
    const data = this.storage.getItem(this.key);

    return data !== null;
  }

  private dump(): void {
    const suggestions = this.searchAdapter.find("");
    const data = suggestions.map((suggestion) => ({
      id: suggestion.id.getValue(),
      name: suggestion.name.getValue(),
    }));

    this.storage.setItem(this.key, JSON.stringify(data));
  }

  private load(): void {
    const json = this.storage.getItem(this.key);

    if (!json) {
      return;
    }

    const data: { id: string; name: string }[] = JSON.parse(json);

    this.searchAdapter.load(data.map((item) => Suggestion.fromObject(item)));
  }
}
