import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class PokemonId extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
    this.isValid(value);
  }

  public static fromNumber(value: number): PokemonId {
    return new PokemonId(value);
  }

  private isValid(value: number): void {
    if (value <= 0) {
      throw new Error("Pokemon ID must be greater than 0");
    }
  }
}
