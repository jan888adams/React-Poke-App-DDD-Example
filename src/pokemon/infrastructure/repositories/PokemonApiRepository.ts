import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonId } from "../../domain/value-objects/pokemon/PokemonId";
import { PokemonName } from "../../domain/value-objects/pokemon/PokemonName";
import { PokemonApiResponse } from "../dtos/PokemonApiResponse";
import { PokemonApiListResponse } from "../dtos/PokemonApiListResponse";

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

  async getAll(page: number, limit: number): Promise<Pokemon[]> {
    const offset = (page - 1) * limit;
    const response = await this.httpClient.get<PokemonApiListResponse>(
      `pokemon?offset=${offset}&limit=${limit}`,
    );

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Pokemon list`);
    }

    const data = response.getData();

    const pokemons = await Promise.all(
      data.results.map(async (result: { name: string; url: string }) => {
        const pokemonResponse = await this.httpClient.get<PokemonApiResponse>(
          result.url,
        );

        if (!pokemonResponse.isSuccess()) {
          throw new Error(`Failed to fetch details for Pokemon ${result.name}`);
        }

        return this.map(pokemonResponse.getData());
      }),
    );

    return pokemons;
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
