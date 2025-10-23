import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class SuggestionId extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value);
  }

  public static new(): SuggestionId {
    const uuid = crypto.randomUUID();
    return new SuggestionId(uuid);
  }

  public static fromString(id: string): SuggestionId {
    return new SuggestionId(id);
  }
}
