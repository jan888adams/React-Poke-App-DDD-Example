import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MoveAccuracy extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MoveAccuracy {
    return new MoveAccuracy(value);
  }
}
