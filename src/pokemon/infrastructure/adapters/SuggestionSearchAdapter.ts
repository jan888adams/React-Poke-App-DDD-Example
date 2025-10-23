import { BinarySearchTree } from "../../../shared/infrastructure/search/BinarySearchTree";
import { Suggestion } from "../../domain/entities/Suggestion";

export class SuggestionSearchAdapter {
  private tree: BinarySearchTree<Suggestion>;

  constructor() {
    this.tree = new BinarySearchTree<Suggestion>(
      (a, b) => a.name.getValue().localeCompare(b.name.getValue()),
      (value) => value.name.getValue(),
    );
  }

  public saveSuggestions(suggestions: Suggestion[]): void {
    suggestions.forEach((suggestion) => this.tree.insert(suggestion));
  }

  public findSuggestions(prefix: string): Suggestion[] {
    return this.tree.findAllStartingWith(prefix);
  }
}
