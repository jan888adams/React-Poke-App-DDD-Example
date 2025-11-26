import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MovePower extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MovePower {
    return new MovePower(value);
  }
}
