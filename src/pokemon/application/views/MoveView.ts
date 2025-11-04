import { Move } from "../../domain/entities/Move";

export class MoveView {
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
      String(move.name.getValue()),
      move.accuracy.getValue() !== null ? String(move.accuracy.getValue()) : "",
      move.effectChance.getValue() !== null
        ? String(move.effectChance.getValue())
        : "",
      move.pp.getValue() !== null ? String(move.pp.getValue()) : "",
      move.priority.getValue() !== null ? String(move.priority.getValue()) : "",
      move.power.getValue() !== null ? String(move.power.getValue()) : "",
      move.damageClass.getValue() !== null
        ? String(move.damageClass.getValue())
        : "",
    );
  }
}
