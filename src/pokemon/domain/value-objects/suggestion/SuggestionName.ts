import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class SuggestionName extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value);
  }

  public static fromString(name: string): SuggestionName {
    return new SuggestionName(name);
  }
}
