import { Pokemon } from "../entities/Pokemon";
import { PokemonId } from "../value-objects/pokemon/PokemonId";
import { PokemonName } from "../value-objects/pokemon/PokemonName";

export interface PokemonRepository {
  findByName(name: PokemonName): Promise<Pokemon | null>;

  findById(id: PokemonId): Promise<Pokemon | null>;

  getAll(page: number, limit: number): Promise<Pokemon[]>;

  getNames(): Promise<PokemonName[]>;
}
