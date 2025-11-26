import { BinarySearchTree } from "../../../shared/infrastructure/search/BinarySearchTree";
import { Suggestion } from "../../domain/entities/Suggestion";

export class SuggestionSearchAdapter {
  private tree: BinarySearchTree<Suggestion>;

  public constructor() {
    this.tree = new BinarySearchTree<Suggestion>(
      (a, b) => a.name.getValue().localeCompare(b.name.getValue()),
      (value) => value.name.getValue(),
    );
  }

  public find(term: string): Suggestion[] {
    const results = this.tree.findAllStartingWith(term);

    return results.sort((a, b) =>
      a.name.getValue().localeCompare(b.name.getValue()),
    );
  }

  public load(suggestions: Suggestion[]): void {
    const balancedSuggestions = this.balanceSuggestions(suggestions);

    balancedSuggestions.forEach((suggestion) => this.tree.insert(suggestion));
  }

  private balanceSuggestions(suggestions: Suggestion[]): Suggestion[] {
    const sortedSuggestions = [...suggestions].sort((a, b) =>
      a.name.getValue().localeCompare(b.name.getValue()),
    );

    const buildBalancedTree = (items: Suggestion[]): Suggestion[] => {
      if (items.length === 0) {
        return [];
      }

      const mid = Math.floor(items.length / 2);
      return [
        items[mid],
        ...buildBalancedTree(items.slice(0, mid)),
        ...buildBalancedTree(items.slice(mid + 1)),
      ];
    };

    return buildBalancedTree(sortedSuggestions);
  }
}
