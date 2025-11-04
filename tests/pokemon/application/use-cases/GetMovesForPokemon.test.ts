import { GetMovesForPokemon } from "../../../../src/pokemon/application/use-cases/GetMovesForPokemon";
import { MoveRepository } from "../../../../src/pokemon/domain/repositories/MoveRepository";
import { Move } from "../../../../src/pokemon/domain/entities/Move";
import { MoveView } from "../../../../src/pokemon/application/views/MoveView";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";

describe("GetMovesForPokemon", () => {
  let repo: MoveRepository;
  let useCase: GetMovesForPokemon;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
    } as unknown as MoveRepository;
    useCase = new GetMovesForPokemon(repo);
  });

  it("returns MoveViews for found moves", async () => {
    const move = Move.fromValues(
      1,
      "thunderbolt",
      90,
      10,
      15,
      0,
      110,
      "special",
    );
    (repo.findById as jest.Mock).mockResolvedValueOnce(move);

    const dto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
      abilities: [],
      moves: [1],
    };

    const result = await useCase.execute(dto);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(MoveView);
    expect(result[0].name).toBe("Thunderbolt");
    expect(result[0].accuracy).toBe("90");
    expect(result[0].effectChance).toBe("10");
    expect(result[0].pp).toBe("15");
    expect(result[0].priority).toBe("0");
    expect(result[0].power).toBe("110");
    expect(result[0].damageClass).toBe("Special");
  });

  it("filters out null moves", async () => {
    (repo.findById as jest.Mock).mockResolvedValueOnce(null);

    const dto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
      abilities: [],
      moves: [99],
    };

    const result = await useCase.execute(dto);
    expect(result).toHaveLength(0);
  });
});
