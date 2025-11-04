import { MoveApiRepository } from "../../../../src/pokemon/infrastructure/repositories/MoveApiRepository";
import { HttpClient } from "../../../../src/shared/infrastructure/http/HttpClient";
import { MoveApiResponse } from "../../../../src/pokemon/infrastructure/types/MoveApiResponse";
import { Move } from "../../../../src/pokemon/domain/entities/Move";

describe("MoveApiRepository", () => {
  let httpClient: HttpClient;
  let repo: MoveApiRepository;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;
    repo = new MoveApiRepository(httpClient);
  });

  it("returns null if move is not found", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => true,
      isSuccess: () => false,
    });
    const result = await repo.findById(1);
    expect(result).toBeNull();
  });

  it("throws if response is not successful", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => false,
      isSuccess: () => false,
    });
    await expect(repo.findById(1)).rejects.toThrow(
      "Failed to fetch Move with ID 1",
    );
  });

  it("maps and returns Move on success", async () => {
    const apiResponse: MoveApiResponse = {
      id: 1,
      name: "thunderbolt",
      accuracy: 90,
      effect_chance: 10,
      pp: 15,
      priority: 0,
      power: 110,
      damage_class: { name: "special" },
    };
    (httpClient.get as jest.Mock).mockResolvedValue({
      isNotFound: () => false,
      isSuccess: () => true,
      getData: () => apiResponse,
    });

    const result = await repo.findById(1);
    expect(result).toBeInstanceOf(Move);
    expect(result?.name.getValue()).toBe("thunderbolt");
    expect(result?.accuracy.getValue()).toBe(90);
    expect(result?.effectChance.getValue()).toBe(10);
    expect(result?.pp.getValue()).toBe(15);
    expect(result?.priority.getValue()).toBe(0);
    expect(result?.power.getValue()).toBe(110);
    expect(result?.damageClass.getValue()).toBe("special");
  });
});
