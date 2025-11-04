import { GetAbilitiesForPokemon } from "../../../../src/pokemon/application/use-cases/GetAbilitiesForPokemon";
import { AbilityRepository } from "../../../../src/pokemon/domain/repositories/AbilityRepository";
import { Ability } from "../../../../src/pokemon/domain/entities/Ability";
import { AbilityView } from "../../../../src/pokemon/application/views/AbilityView";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";

describe("GetAbilitiesForPokemon", () => {
  let repo: AbilityRepository;
  let useCase: GetAbilitiesForPokemon;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
    } as unknown as AbilityRepository;
    useCase = new GetAbilitiesForPokemon(repo);
  });

  it("returns AbilityViews for found abilities", async () => {
    const ability = Ability.fromValues(
      1,
      "overgrow",
      "generation-iii",
      "Boosts Grass moves.",
    );
    (repo.findById as jest.Mock).mockResolvedValueOnce(ability);

    const dto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
      abilities: [1],
      moves: [],
    };

    const result = await useCase.execute(dto);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(AbilityView);
    expect(result[0].name).toBe("Overgrow");
    expect(result[0].generation).toBe("Generation-iii");
    expect(result[0].effect).toBe("Boosts Grass moves.");
  });

  it("filters out null abilities", async () => {
    (repo.findById as jest.Mock).mockResolvedValueOnce(null);

    const dto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
      abilities: [99],
      moves: [],
    };

    const result = await useCase.execute(dto);
    expect(result).toHaveLength(0);
  });
});
