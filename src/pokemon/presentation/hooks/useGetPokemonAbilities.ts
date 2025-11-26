import { useEffect, useState } from "react";
import { getAbilitiesForPokemon } from "../../../shared/infrastructure/di/DependencyContainer";
import { AbilityView } from "../../application/views/AbilityView";
import { PokemonDto } from "../../application/dtos/PokemonDto";
import { PokemonView } from "../../application/views/PokemonView";

export const useGetPokemonAbilities = (
  pokemon: PokemonView | null,
): Array<AbilityView> => {
  const [abilities, setAbilities] = useState<Array<AbilityView>>([]);

  useEffect(() => {
    if (!pokemon) {
      setAbilities([]);
      return;
    }
    const fetchAbilities = async () => {
      const result = await getAbilitiesForPokemon.execute(
        PokemonDto.fromPokemonView(pokemon),
      );
      setAbilities(result);
    };
    fetchAbilities();
  }, [pokemon]);

  return abilities;
};
