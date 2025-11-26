import { MoveName } from "../value-objects/move/MoveName";
import { MoveAccuracy } from "../value-objects/move/MoveAccuracy";
import { MoveEffectChance } from "../value-objects/move/MoveEffectChance";
import { MovePP } from "../value-objects/move/MovePP";
import { MovePriority } from "../value-objects/move/MovePriority";
import { MovePower } from "../value-objects/move/MovePower";
import { MoveDamageClass } from "../value-objects/move/MoveDamageClass";
import { MoveId } from "../value-objects/move/MoveId";

export class Move {
  private constructor(
    public readonly id: MoveId,
    public readonly name: MoveName,
    public readonly accuracy: MoveAccuracy,
    public readonly effectChance: MoveEffectChance,
    public readonly pp: MovePP,
    public readonly priority: MovePriority,
    public readonly power: MovePower,
    public readonly damageClass: MoveDamageClass,
  ) {}

  public static fromValues(
    id: number,
    name: string,
    accuracy: number,
    effectChance: number,
    pp: number,
    priority: number,
    power: number,
    damageClass: string,
  ): Move {
    return new Move(
      MoveId.fromNumber(id),
      MoveName.fromString(name),
      MoveAccuracy.fromNumber(accuracy),
      MoveEffectChance.fromNumber(effectChance),
      MovePP.fromNumber(pp),
      MovePriority.fromNumber(priority),
      MovePower.fromNumber(power),
      MoveDamageClass.fromString(damageClass),
    );
  }
}
