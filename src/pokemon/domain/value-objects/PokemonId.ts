import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class PokemonId extends ValueObject<number> {
  private constructor(value: number) { // ← private
    super(value);
    this.isValid(value);
  }

  public static fromNumber(value: number): PokemonId {
    return new PokemonId(value);
  }

  private isValid(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error("Pokemon ID must be an integer");
    }
  }
}
