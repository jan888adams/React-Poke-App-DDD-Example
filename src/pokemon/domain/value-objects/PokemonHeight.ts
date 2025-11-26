import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class PokemonHeight extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
    this.validate(value);
  }

  public static fromNumber(value: number): PokemonHeight {
    return new PokemonHeight(value);
  }

  private validate(value: number): void {
    if (value <= 0) {
      throw new Error("Pokemon Height must be greater than 0");
    }
  }
}
