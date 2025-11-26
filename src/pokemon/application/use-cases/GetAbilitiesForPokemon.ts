import { AbilityRepository } from "../../domain/repositories/AbilityRepository";
import { PokemonDto } from "../dtos/PokemonDto";
import { AbilityView } from "../views/AbilityView";

export class GetAbilitiesForPokemon {
  public constructor(private readonly AbilityRepository: AbilityRepository) {}

  public async execute(pokemonDto: PokemonDto): Promise<Array<AbilityView>> {
    const abilities = await Promise.all(
      pokemonDto.abilities.map(async (id) => {
        return await this.AbilityRepository.findById(id);
      }),
    );

    return abilities
      .filter(
        (ability): ability is NonNullable<typeof ability> => ability !== null,
      )
      .map((ability) => AbilityView.fromAbility(ability));
  }
}
