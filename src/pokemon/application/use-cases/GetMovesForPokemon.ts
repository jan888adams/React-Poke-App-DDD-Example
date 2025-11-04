import { MoveRepository } from "../../domain/repositories/MoveRepository";
import { PokemonDto } from "../dtos/PokemonDto";
import { MoveView } from "../views/MoveView";

export class GetMovesForPokemon {
  public constructor(private moveRepository: MoveRepository) {}

  public async execute(pokemonDto: PokemonDto): Promise<MoveView[]> {
    const moves = await Promise.all(
      pokemonDto.moves.map(async (moveId) => {
        return this.moveRepository.findById(moveId);
      }),
    );

    return moves
      .filter((move): move is NonNullable<typeof move> => move !== null)
      .map((move) => MoveView.fromMove(move));
  }
}
