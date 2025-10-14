import { Pokemon } from "../entities/Pokemon";
import { PokemonId } from "../value-objects/PokemonId";
import { PokemonName } from "../value-objects/PokemonName";

export interface PokemonRepository {
  findByName(name: PokemonName): Promise<Pokemon | null>;
  findById(id: PokemonId): Promise<Pokemon | null>;
}
