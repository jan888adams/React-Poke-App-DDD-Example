import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class PokemonExperience extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
    this.validate(value);
  }

  public static fromNumber(value: number): PokemonExperience {
    return new PokemonExperience(value);
  }

  private validate(value: number): void {
    if (value <= 0) {
      throw new Error("Pokemon Experience must be greater than 0");
    }
  }
}
