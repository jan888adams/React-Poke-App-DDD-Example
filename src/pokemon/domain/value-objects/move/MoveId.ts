import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MoveId extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MoveId {
    return new MoveId(value);
  }
}
