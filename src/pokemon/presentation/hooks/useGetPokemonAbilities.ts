import { useEffect, useState } from "react";
import { getAbilitiesForPokemon } from "../../../shared/infrastructure/di/DependencyContainer";
import { AbilityView } from "../../application/views/AbilityView";
import { PokemonDto } from "../../application/dtos/PokemonDto";
import { PokemonView } from "../../application/views/PokemonView";

export const useGetPokemonAbilities = (
  view?: PokemonView,
): Array<AbilityView> => {
  const [abilities, setAbilities] = useState<Array<AbilityView>>([]);

  useEffect(() => {
    if (!view) {
      setAbilities([]);
      return;
    }
    const fetchAbilities = async () => {
      const result = await getAbilitiesForPokemon.execute(
        PokemonDto.fromPokemonView(view),
      );
      setAbilities(result);
    };
    fetchAbilities();
  }, [view]);

  return abilities;
};
