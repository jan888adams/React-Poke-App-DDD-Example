import { ValueObject } from "../../../shared/domain/value-objects/ValueObject";

export class PokemonName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate();
  }

  getCapitalized(): string {
    return (
      this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase()
    );
  }

  static fromString(name: string): PokemonName {
    return new PokemonName(name.toLowerCase().trim());
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error("Pokemon name cannot be empty");
    }
  }
}
