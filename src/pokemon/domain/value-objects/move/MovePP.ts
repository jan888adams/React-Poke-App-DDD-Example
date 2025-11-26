import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MovePP extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MovePP {
    return new MovePP(value);
  }
}
