import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class CartId extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate(value);
  }

  public static new(): CartId {
    return new CartId(crypto.randomUUID());
  }

  public static fromString(value: string): CartId {
    return new CartId(value);
  }

  private validate(value: string): void {
    if (value.length === 0) {
      throw new Error("Card ID must be a non-empty string");
    }
  }
}
