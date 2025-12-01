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
      ability.id.getValue().toString(),
      Formatter.capitalize(ability.name.getValue()),
      Formatter.capitalize(ability.generation.getValue()),
      Formatter.capitalize(ability.effect.getValue()),
    );
  }
}
