import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class PokemonType extends ValueObject<string> {
  private constructor(readonly value: string) {
    const normalizedValue = value.toLowerCase().trim();
    super(normalizedValue);
  }

  public getName(): string {
    return this.getValue();
  }

  public getCapitalized(): string {
    return this.getValue().charAt(0).toUpperCase() + this.getValue().slice(1);
  }

  public static fromString(value: string): PokemonType {
    return new PokemonType(value);
  }
}
