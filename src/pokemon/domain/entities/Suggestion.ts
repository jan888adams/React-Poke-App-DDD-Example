import { SuggestionId } from "../value-objects/suggestion/SuggestionId";
import { SuggestionName } from "../value-objects/suggestion/SuggestionName";
import { Searchable } from "../../../shared/domain/search/Searchable";

export class Suggestion implements Searchable {
  public constructor(
    public readonly id: SuggestionId,
    public readonly name: SuggestionName,
  ) {}

  public getSearchableValue(): string {
    return this.name.getValue();
  }

  public static fromObject(data: { id: string; name: string }): Suggestion {
    return new Suggestion(
      SuggestionId.fromString(data.id),
      SuggestionName.fromString(data.name),
    );
  }

  public static fromString(name: string): Suggestion {
    return new Suggestion(SuggestionId.new(), SuggestionName.fromString(name));
  }
}
