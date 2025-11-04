import { Ability } from "../../domain/entities/Ability";
import { capitalize } from "../../../shared/presentation/tools/String";

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
      capitalize(ability.name),
      capitalize(ability.generation ?? ""),
      capitalize(ability.effect ?? ""),
    );
  }
}
