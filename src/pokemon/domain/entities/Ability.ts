export class Ability {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly generation: string,
    public readonly effect: string,
  ) {}

  public static fromValues(
    id: number,
    name: string,
    generation: string,
    effect: string,
  ): Ability {
    return new Ability(id, name, generation, effect);
  }
}
