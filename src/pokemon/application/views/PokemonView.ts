import { Pokemon } from "../../domain/entities/Pokemon";

export class PokemonView {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly imageUrl: string | null,
    public readonly altText: string = "",
    public readonly types: string[],
    public readonly baseExperience: number,
    public readonly height: number,
    public readonly weight: number,
    public readonly abilities: Array<number> = [],
    public readonly moves: Array<number> = [],
  ) {}

  public static fromPokemon(pokemon: Pokemon): PokemonView {
    return new PokemonView(
      pokemon.id.getValue(),
      pokemon.name.getValue().charAt(0).toUpperCase() +
        pokemon.name.getValue().slice(1),
      pokemon.sprites.front_default,
      pokemon.name.getValue(),
      pokemon.types.map((type) => type.getValue()),
      pokemon.baseExperience.getValue(),
      pokemon.height.getValue(),
      pokemon.weight.getValue(),
      pokemon.abilities.map((ability) => ability.getValue()),
      pokemon.moves.map((move) => move.getValue()) || [],
    );
  }
}
