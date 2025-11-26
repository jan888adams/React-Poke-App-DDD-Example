import { PokemonId } from "../../../../src/pokemon/domain/value-objects/PokemonId";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/PokemonName";
import { PokemonApiRepository } from "../../../../src/pokemon/infrastructure/repositories/PokemonApiRepository";
import { ApiResponse } from "../../../../src/shared/infrastructure/http/ApiResponse";
import { HttpClient } from "../../../../src/shared/infrastructure/http/HttpClient";

jest.mock("../../../../src/shared/infrastructure/http/HttpClient");

describe("PokemonApiRepository", () => {
  let repository: PokemonApiRepository;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new HttpClient(
      "https://test.com",
    ) as jest.Mocked<HttpClient>;
    mockHttpClient.get = jest.fn();

    repository = new PokemonApiRepository(mockHttpClient);
  });

  describe("findByName", () => {
    it("should return expected Pokemon when API returns valid data", async () => {
      const mockApiData = {
        id: 25,
        name: "pikachu",
        sprites: {
          front_default: "https://example.com/pikachu.png",
        },
        types: [{ type: { name: "electric" } }],
        height: 4,
        weight: 60,
      };

      const mockApiResponse = new ApiResponse(mockApiData, 200);
      mockHttpClient.get.mockResolvedValue(mockApiResponse);

      const result = await repository.findByName(
        PokemonName.fromString("Pikachu"),
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith("pokemon/pikachu");
      expect(result?.getName()).toBe("pikachu");
      expect(result?.getCapitalizedName()).toBe("Pikachu");
      expect(result?.getId()).toBe(25);
      expect(result?.getImageUrl()).toBe("https://example.com/pikachu.png");
      expect(result?.getTypes()).toEqual(["electric"]);
    });

    it("should return null when Pokemon not found", async () => {
      const mockApiResponse = new ApiResponse({ message: "Not found" }, 404);
      mockHttpClient.get.mockResolvedValue(mockApiResponse);

      const result = await repository.findByName(
        PokemonName.fromString("nonexistent"),
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith("pokemon/nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("should return expected Pokemon when API returns valid data", async () => {
      const mockApiData = {
        id: 25,
        name: "pikachu",
        sprites: {
          front_default: "https://example.com/pikachu.png",
        },
        types: [{ type: { name: "electric" } }],
        height: 4,
        weight: 60,
      };

      const mockApiResponse = new ApiResponse(mockApiData, 200);
      mockHttpClient.get.mockResolvedValue(mockApiResponse);

      const result = await repository.findById(PokemonId.fromNumber(25));

      expect(mockHttpClient.get).toHaveBeenCalledWith("pokemon/25");
      expect(result?.getName()).toBe("pikachu");
      expect(result?.getCapitalizedName()).toBe("Pikachu");
      expect(result?.getId()).toBe(25);
      expect(result?.getImageUrl()).toBe("https://example.com/pikachu.png");
      expect(result?.getTypes()).toEqual(["electric"]);
    });

    it("should return null when Pokemon not found", async () => {
      const mockApiResponse = new ApiResponse({ message: "Not found" }, 404);
      mockHttpClient.get.mockResolvedValue(mockApiResponse);

      const result = await repository.findById(PokemonId.fromNumber(999));

      expect(mockHttpClient.get).toHaveBeenCalledWith("pokemon/999");
      expect(result).toBeNull();
    });
  });
});
