import { ValueObject } from "../../../../src/shared/domain/value-objects/ValueObject";

class NumberValueObject extends ValueObject<number> {
  public static of(value: number): NumberValueObject {
    return new NumberValueObject(value);
  }
}

class StringValueObject extends ValueObject<string> {
  public static of(value: string): StringValueObject {
    return new StringValueObject(value);
  }
}

describe("ValueObject", () => {
  describe("getValue", () => {
    it("returns the wrapped primitive value", () => {
      expect(NumberValueObject.of(42).getValue()).toBe(42);
      expect(StringValueObject.of("pikachu").getValue()).toBe("pikachu");
    });
  });

  describe("toString", () => {
    it("returns the string representation of the value", () => {
      expect(NumberValueObject.of(7).toString()).toBe("7");
      expect(StringValueObject.of("bulbasaur").toString()).toBe("bulbasaur");
    });
  });

  describe("equals", () => {
    it("returns true for two value objects with the same value", () => {
      const a = NumberValueObject.of(25);
      const b = NumberValueObject.of(25);

      expect(a.equals(b)).toBe(true);
    });

    it("returns false for two value objects with different values", () => {
      const a = NumberValueObject.of(1);
      const b = NumberValueObject.of(2);

      expect(a.equals(b)).toBe(false);
    });

    it("returns true when a string value object is compared with itself", () => {
      const a = StringValueObject.of("charmander");

      expect(a.equals(a)).toBe(true);
    });

    it("returns false for string value objects with different values", () => {
      const a = StringValueObject.of("squirtle");
      const b = StringValueObject.of("wartortle");

      expect(a.equals(b)).toBe(false);
    });
  });
});
