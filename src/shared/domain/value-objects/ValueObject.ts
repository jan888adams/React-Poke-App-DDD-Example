export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }

  public equals(other: ValueObject<T>): boolean {
    if (!(other instanceof ValueObject)) {
      return false;
    }

    return this.value === other.value;
  }

  public toString(): string {
    return String(this.value);
  }

  public valueOf(): T {
    return this.value;
  }
}
