import { Move } from "../entities/Move.ts";

export interface MoveRepository {
  findById(id: number): Promise<Move | null>;
}
