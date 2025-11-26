import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class MoveEffectChance extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): MoveEffectChance {
    return new MoveEffectChance(value);
  }
}
