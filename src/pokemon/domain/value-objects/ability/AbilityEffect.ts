import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class Effect extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromValue(value: string): Effect {
    return new Effect(value);
  }
}
