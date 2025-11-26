import { Move } from "../../domain/entities/Move";
import { MoveRepository } from "../../domain/repositories/MoveRepository";
import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";
import { MoveApiResponse } from "../types/MoveApiResponse";

export class MoveApiRepository implements MoveRepository {
  public constructor(private httpClient: HttpClient) {}

  public async findById(id: number): Promise<Move | null> {
    const response = await this.httpClient.get<MoveApiResponse>(`/move/${id}`);

    if (response.isNotFound()) {
      return null;
    }

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Move with ID ${id}`);
    }

    const data = response.getData();

    return Move.fromValues(
      id,
      data.name,
      data.accuracy,
      data.effect_chance,
      data.pp,
      data.priority,
      data.power,
      data.damage_class.name,
    );
  }
}
