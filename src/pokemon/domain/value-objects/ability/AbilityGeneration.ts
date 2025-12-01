import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject.ts";

export class AbilityGeneration extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromValue(value: string): AbilityGeneration {
    return new AbilityGeneration(value);
  }
}
