import { useEffect, useState } from "react";
import { PokemonView } from "../../application/views/PokemonView";
import { MoveView } from "../../application/views/MoveView";
import { getMovesForPokemon } from "../../../shared/infrastructure/di/DependencyContainer";

export const useGetPokemonMoves = (pokemon: PokemonView | null): MoveView[] => {
  const [moves, setMoves] = useState<MoveView[]>([]);

  useEffect(() => {
    if (!pokemon) {
      setMoves([]);
      return;
    }
    const getMoves = async () => {
      const moves = await getMovesForPokemon.execute(pokemon);
      setMoves(moves);
    };

    getMoves();
  }, [pokemon]);

  return moves;
};
