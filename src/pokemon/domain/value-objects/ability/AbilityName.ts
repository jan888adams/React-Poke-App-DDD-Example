import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject.ts";

export class AbilityName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromValue(value: string): AbilityName {
    return new AbilityName(value);
  }
}
