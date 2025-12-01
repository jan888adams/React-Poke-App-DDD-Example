import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class AbilityEffect extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromValue(value: string): AbilityEffect {
    return new AbilityEffect(value);
  }
}
