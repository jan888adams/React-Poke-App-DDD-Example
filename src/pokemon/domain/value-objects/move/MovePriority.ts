import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MovePriority extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MovePriority {
    return new MovePriority(value);
  }
}
