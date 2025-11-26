import { Move } from "../../domain/entities/Move";

export interface MoveRepository {
  findById(id: number): Promise<Move | null>;
}
