import { HttpClient } from "../../../shared/infrastructure/http/HttpClient";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokemonRepository } from "../../domain/repositories/PokemonRepository";
import { PokemonId } from "../../domain/value-objects/PokemonId";
import { PokemonName } from "../../domain/value-objects/PokemonName";
import { PokemonType } from "../../domain/value-objects/PokemonType";
import { PokemonApiDto } from "../dtos/PokemonApiDto";

export class PokemonApiRepository implements PokemonRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findById(id: PokemonId): Promise<Pokemon | null> {
    const response = await this.httpClient.get<PokemonApiDto>(
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
    const response = await this.httpClient.get<PokemonApiDto>(
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

  private map(dto: PokemonApiDto): Pokemon {
    const id = PokemonId.fromNumber(dto.id);
    const name = PokemonName.fromString(dto.name);

    const types = dto.types.map((typeData) =>
      PokemonType.fromString(typeData.type.name),
    );

    const sprites = {
      front_default: dto.sprites.front_default,
    };

    return new Pokemon(id, name, sprites, types);
  }
}
