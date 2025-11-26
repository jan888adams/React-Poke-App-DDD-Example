import { Ability } from "../../domain/entities/Ability";
import { Formatter } from "../services/Formatter";

export class AbilityView {
  public static readonly fields: Array<string> = [
    "Name",
    "Generation",
    "Effect",
  ];

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly generation: string,
    public readonly effect: string,
  ) {}

  public static fromAbility(ability: Ability): AbilityView {
    return new AbilityView(
      String(ability.id),
      Formatter.capitalize(ability.name),
      Formatter.capitalize(ability.generation ?? ""),
      Formatter.capitalize(ability.effect ?? ""),
    );
  }
}
