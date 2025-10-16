import { PokemonId } from "../value-objects/PokemonId";
import { PokemonName } from "../value-objects/PokemonName";
import { PokemonType } from "../value-objects/PokemonType";

export class Pokemon {
  private constructor(
    private readonly id: PokemonId,
    private readonly name: PokemonName,
    private readonly sprites: { front_default: string | null },
    private readonly types: PokemonType[],
    private readonly baseExperience: number,
    private readonly height: number,
    private readonly weight: number,
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
    return this.baseExperience;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWeight(): number {
    return this.weight;
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

    return new Pokemon(
      pokemonId,
      pokemonName,
      { front_default: imageUrl },
      pokemonTypes,
      baseExperience,
      height,
      weight,
    );
  }
}
