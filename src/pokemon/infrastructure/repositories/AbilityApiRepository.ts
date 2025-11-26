import { Ability } from "../../domain/entities/Ability";
import { AbilityRepository } from "../../domain/repositories/AbilityRepository";
import { AbilityApiResponse } from "../types/AbilityApiResponse";
import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";

export class AbilityApiRepository implements AbilityRepository {
  public constructor(private readonly httpClient: HttpClient) {}

  public async findById(id: number): Promise<Ability | null> {
    const response = await this.httpClient.get<AbilityApiResponse>(
      `ability/${id}`,
    );

    if (response.isNotFound()) {
      return null;
    }

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Ability with ID ${id}`);
    }

    return this.map(response.getData());
  }

  private map(response: AbilityApiResponse): Ability {
    return Ability.fromValues(
      response.id,
      response.name,
      response.generation.name,
      response.effect_entries.find((entry) => entry.language.name === "en")
        ?.short_effect || "",
    );
  }
}
