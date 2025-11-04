import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class AbilityId extends ValueObject<number> {
  private constructor(id: number) {
    super(id);
  }

  public static fromNumber(value: number): AbilityId {
    return new AbilityId(value);
  }
}
