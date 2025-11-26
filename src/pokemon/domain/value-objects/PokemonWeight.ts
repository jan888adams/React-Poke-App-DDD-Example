import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class PokemonWeight extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
    this.validate(value);
  }

  public static fromNumber(value: number): PokemonWeight {
    return new PokemonWeight(value);
  }

  private validate(value: number): void {
    if (value <= 0) {
      throw new Error("Pokemon Weight must be greater than 0");
    }
  }
}
