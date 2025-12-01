import { AbilityId } from "../value-objects/ability/AbilityId.ts";
import { AbilityName } from "../value-objects/ability/AbilityName.ts";
import { AbilityEffect } from "../value-objects/ability/AbilityEffect.ts";
import { AbilityGeneration } from "../value-objects/ability/AbilityGeneration.ts";

export class Ability {
  private constructor(
    public readonly id: AbilityId,
    public readonly name: AbilityName,
    public readonly generation: AbilityGeneration,
    public readonly effect: AbilityEffect,
  ) {}

  public static fromValues(
    id: number,
    name: string,
    generation: string,
    effect: string,
  ): Ability {
    return new Ability(
      AbilityId.fromNumber(id),
      AbilityName.fromValue(name),
      AbilityGeneration.fromValue(generation),
      AbilityEffect.fromValue(effect),
    );
  }
}
