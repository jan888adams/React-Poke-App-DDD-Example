import { PokemonExperience } from "../value-objects/PokemonExperience";
import { PokemonHeight } from "../value-objects/PokemonHeight";
import { PokemonId } from "../value-objects/PokemonId";
import { PokemonName } from "../value-objects/PokemonName";
import { PokemonType } from "../value-objects/PokemonType";
import { PokemonWeight } from "../value-objects/PokemonWeight";

export class Pokemon {
  private constructor(
    public readonly id: PokemonId,
    public readonly name: PokemonName,
    public readonly sprites: { front_default: string | null },
    public readonly types: PokemonType[],
    public readonly baseExperience: PokemonExperience,
    public readonly height: PokemonHeight,
    public readonly weight: PokemonWeight,
  ) {}

  public static fromValues(
    id: number,
    name: string,
    imageUrl: string | null,
    types: string[],
    baseExperience: number,
    height: number,
    weight: number,
  ): Pokemon {
    const pokemonId = PokemonId.fromNumber(id);
    const pokemonName = PokemonName.fromString(name);
    const pokemonTypes = types.map((type) => PokemonType.fromString(type));
    const pokemonBaseExperience = PokemonExperience.fromNumber(baseExperience);
    const pokemonHeight = PokemonHeight.fromNumber(height);
    const pokemonWeight = PokemonWeight.fromNumber(weight);

    return new Pokemon(
      pokemonId,
      pokemonName,
      { front_default: imageUrl },
      pokemonTypes,
      pokemonBaseExperience,
      pokemonHeight,
      pokemonWeight,
    );
  }
}
