import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MoveDamageClass extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): MoveDamageClass {
    return new MoveDamageClass(value);
  }
}
