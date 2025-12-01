import { Move } from "../../domain/entities/Move";
import { Formatter } from "../services/Formatter";

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
      move.id.toString(),
      Formatter.capitalize(move.name.toString()),
      move.accuracy.toString(),
      move.effectChance.toString(),
      move.pp.toString(),
      move.priority.toString(),
      move.power.toString(),
      move.damageClass.getValue(),
    );
  }
}
