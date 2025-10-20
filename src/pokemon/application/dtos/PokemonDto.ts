import { PokemonView } from "../views/PokemonView";

export class PokemonDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly imageUrl: string | null,
    public readonly types: string[],
    public readonly baseExperience: number,
    public readonly height: number,
    public readonly weight: number,
  ) {}

  public static fromPokemonView(view: PokemonView): PokemonDto {
    return new PokemonDto(
      view.id,
      view.name,
      view.imageUrl,
      view.types,
      view.baseExperience,
      view.height,
      view.weight,
    );
  }
}
