import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonId } from "../../domain/value-objects/pokemon/PokemonId";
import { PokemonName } from "../../domain/value-objects/pokemon/PokemonName";
import { PokemonApiResponse } from "../dtos/PokemonApiResponse";

export class PokemonApiRepository implements PokemonRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findById(id: PokemonId): Promise<Pokemon | null> {
    const response = await this.httpClient.get<PokemonApiResponse>(
      `pokemon/${id.getValue()}`,
    );

    if (response.isNotFound()) {
      return null;
    }

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Pokemon with ID ${id.getValue()}`);
    }

    return this.map(response.getData());
  }

  async findByName(name: PokemonName): Promise<Pokemon | null> {
    const response = await this.httpClient.get<PokemonApiResponse>(
      `pokemon/${name.getValue().toLowerCase()}`,
    );

    if (response.isNotFound()) {
      return null;
    }

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Pokemon with name ${name.getValue()}`);
    }

    return this.map(response.getData());
  }

  private map(response: PokemonApiResponse): Pokemon {
    return Pokemon.fromValues(
      response.id,
      response.name,
      response.sprites.front_default,
      response.types.map(
        (typeInfo: { type: { name: string } }) => typeInfo.type.name,
      ),
      response.base_experience,
      response.height,
      response.weight,
    );
  }
}
