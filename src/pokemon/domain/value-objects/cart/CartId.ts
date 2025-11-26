import { ValueObject } from "../../../../shared/domain/value-objects/ValueObject";

export class CardId extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate(value);
  }

  public static new(): CardId {
    return new CardId(crypto.randomUUID());
  }

  public static fromString(value: string): CardId {
    return new CardId(value);
  }

  private validate(value: string): void {
    if (value.length === 0) {
      throw new Error("Card ID must be a non-empty string");
    }
  }
}
