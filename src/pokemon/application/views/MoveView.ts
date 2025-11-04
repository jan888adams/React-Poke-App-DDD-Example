import { Move } from "../../domain/entities/Move";
import { capitalize } from "../../../shared/presentation/tools/String";

export class MoveView {
  public static readonly fields: Array<string> = [
    "Name",
    "Accuracy",
    "Effect Chance",
    "PP",
    "Priority",
    "Power",
    "Damage Class",
  ];

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly accuracy: string,
    public readonly effectChance: string,
    public readonly pp: string,
    public readonly priority: string,
    public readonly power: string,
    public readonly damageClass: string,
  ) {}

  public static fromMove(move: Move): MoveView {
    return new MoveView(
      String(move.id.getValue()),
      capitalize(move.name.getValue()),
      move.accuracy.getValue() !== null
        ? capitalize(String(move.accuracy.getValue()))
        : "",
      move.effectChance.getValue() !== null
        ? capitalize(String(move.effectChance.getValue()))
        : "",
      move.pp.getValue() !== null ? capitalize(String(move.pp.getValue())) : "",
      move.priority.getValue() !== null
        ? capitalize(String(move.priority.getValue()))
        : "",
      move.power.getValue() !== null
        ? capitalize(String(move.power.getValue()))
        : "",
      move.damageClass.getValue() !== null
        ? capitalize(move.damageClass.getValue())
        : "",
    );
  }
}
