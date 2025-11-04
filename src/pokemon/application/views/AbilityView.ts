import { Ability } from "../../domain/entities/Ability";

export class AbilityView {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly generation: string,
    public readonly effect: string,
  ) {}

  public static fromAbility(ability: Ability): AbilityView {
    return new AbilityView(
      String(ability.id),
      String(ability.name),
      String(ability.generation ?? ""),
      String(ability.effect ?? ""),
    );
  }
}
