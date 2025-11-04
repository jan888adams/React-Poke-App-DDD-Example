import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonId } from "../../domain/value-objects/pokemon/PokemonId";
import { PokemonName } from "../../domain/value-objects/pokemon/PokemonName";
import { PokemonApiResponse } from "../types/PokemonApiResponse";
import { PokemonApiListResponse } from "../types/PokemonApiListResponse";

export class PokemonApiRepository implements PokemonRepository {
  constructor(private readonly httpClient: HttpClient) {}

  public async findById(id: PokemonId): Promise<Pokemon | null> {
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

  public async findByName(name: PokemonName): Promise<Pokemon | null> {
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

  public async getAll(page: number, limit: number): Promise<Pokemon[]> {
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

  public async getNames(): Promise<PokemonName[]> {
    const response = await this.httpClient.get<PokemonApiListResponse>(
      `pokemon?offset=0&limit=10000`,
    );

    if (!response.isSuccess()) {
      throw new Error(`Failed to fetch Pokemon names`);
    }

    return response
      .getData()
      .results.map((pokemon) => PokemonName.fromString(pokemon.name));
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
      response.abilities.map(
        (abilityInfo: { ability: { name: string; url: string } }) => {
          const urlParts = abilityInfo.ability.url.split("/").filter(Boolean);
          const abilityId = parseInt(urlParts[urlParts.length - 1], 10);
          return { id: abilityId };
        },
      ),
      response.moves.map(
        (moveInfo: { move: { name: string; url: string } }) => {
          const urlParts = moveInfo.move.url.split("/").filter(Boolean);
          const moveId = parseInt(urlParts[urlParts.length - 1], 10);
          return { id: moveId };
        },
      ),
    );
  }
}
