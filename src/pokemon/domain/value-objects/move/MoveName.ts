import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MoveName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): MoveName {
    return new MoveName(value);
  }
}
