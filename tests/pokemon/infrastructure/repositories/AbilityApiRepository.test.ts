import { AbilityApiRepository } from "../../../../src/pokemon/infrastructure/repositories/AbilityApiRepository";
import { HttpClient } from "../../../../src/shared/infrastructure/http/HttpClient";
import { Ability } from "../../../../src/pokemon/domain/entities/Ability";
import { AbilityApiResponse } from "../../../../src/pokemon/infrastructure/types/AbilityApiResponse";

describe("AbilityApiRepository", () => {
  let httpClient: HttpClient;
  let repository: AbilityApiRepository;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;
    repository = new AbilityApiRepository(httpClient);
  });

  it("returns null if ability is not found", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => true,
      isSuccess: () => false,
    });
    const result = await repository.findById(1);
    expect(result).toBeNull();
  });

  it("throws if response is not successful", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => false,
      isSuccess: () => false,
    });
    await expect(repository.findById(1)).rejects.toThrow(
      "Failed to fetch Ability with ID 1",
    );
  });

  it("maps and returns Ability on success", async () => {
    const apiResponse: AbilityApiResponse = {
      id: 1,
      name: "overgrow",
      generation: { name: "generation-iii", url: "..." },
      effect_entries: [
        { short_effect: "Boosts Grass moves.", language: { name: "en" } },
        { short_effect: "Erhöht Pflanzen-Attacken.", language: { name: "de" } },
      ],
    };
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => false,
      isSuccess: () => true,
      getData: () => apiResponse,
    });

    const result = await repository.findById(1);
    expect(result).toBeInstanceOf(Ability);
    expect(result?.id.getValue()).toBe(1);
    expect(result?.name.getValue()).toBe("overgrow");
    expect(result?.generation.getValue()).toBe("generation-iii");
    expect(result?.effect.getValue()).toBe("Boosts Grass moves.");
  });
});
