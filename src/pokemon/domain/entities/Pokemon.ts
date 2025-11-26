import { PokemonExperience } from "../value-objects/PokemonExperience";
import { PokemonHeight } from "../value-objects/PokemonHeight";
import { PokemonId } from "../value-objects/PokemonId";
import { PokemonName } from "../value-objects/PokemonName";
import { PokemonType } from "../value-objects/PokemonType";
import { PokemonWeight } from "../value-objects/PokemonWeight";

export class Pokemon {
  private constructor(
    private readonly id: PokemonId,
    private readonly name: PokemonName,
    private readonly sprites: { front_default: string | null },
    private readonly types: PokemonType[],
    private readonly baseExperience: PokemonExperience,
    private readonly height: PokemonHeight,
    private readonly weight: PokemonWeight,
  ) {}

  public getId(): number {
    return this.id.getValue();
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getCapitalizedName(): string {
    return this.name.getCapitalized();
  }

  public getImageUrl(): string | null {
    return this.sprites.front_default;
  }

  public getTypes(): string[] {
    return this.types.map((type) => type.getName());
  }

  public getBaseExperience(): number {
    return this.baseExperience.getValue();
  }

  public getHeight(): number {
    return this.height.getValue();
  }

  public getWeight(): number {
    return this.weight.getValue();
  }

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
