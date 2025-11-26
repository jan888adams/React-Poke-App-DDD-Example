export class Generation extends Number {
  private constructor(value: number) {
    super(value);
  }

  public static fromValue(value: number): Generation {
    return new Generation(value);
  }
}
