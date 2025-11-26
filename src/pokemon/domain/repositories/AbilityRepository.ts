import { Ability } from "../entities/Ability";

export interface AbilityRepository {
  findById(id: number): Promise<Ability | null>;
}
