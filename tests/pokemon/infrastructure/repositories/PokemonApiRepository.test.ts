import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonId } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonId";
import { PokemonName } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonName";
import { PokemonType } from "../../../../src/pokemon/domain/value-objects/pokemon/PokemonType";
import { PokemonApiListResponse } from "../../../../src/pokemon/infrastructure/dtos/PokemonApiListResponse";
import { PokemonApiResponse } from "../../../../src/pokemon/infrastructure/dtos/PokemonApiResponse";
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
      expect(result?.name.getValue()).toBe(
        PokemonName.fromString("pikachu").getValue(),
      );
      expect(result?.id.getValue()).toBe(PokemonId.fromNumber(25).getValue());
      expect(result?.sprites.front_default).toBe(
        "https://example.com/pikachu.png",
      );
      expect(result?.types[0].getValue()).toEqual(
        PokemonType.fromString("electric").getValue(),
      );
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
      expect(result?.name.getValue()).toBe(
        PokemonName.fromString("pikachu").getValue(),
      );
      expect(result?.id.getValue()).toBe(PokemonId.fromNumber(25).getValue());
      expect(result?.sprites.front_default).toBe(
        "https://example.com/pikachu.png",
      );
      expect(result?.types[0].getValue()).toEqual(
        PokemonType.fromString("electric").getValue(),
      );
    });

    it("should return null when Pokemon not found", async () => {
      const mockApiResponse = new ApiResponse({ message: "Not found" }, 404);
      mockHttpClient.get.mockResolvedValue(mockApiResponse);

      const result = await repository.findById(PokemonId.fromNumber(999));

      expect(mockHttpClient.get).toHaveBeenCalledWith("pokemon/999");
      expect(result).toBeNull();
    });
  });

  describe("getAll", () => {
    it("fetches paginated Pokémon data and maps it to Pokemon entities", async () => {
      const mockListResponse: PokemonApiListResponse = {
        count: 1281,
        next: "https://pokeapi.co/api/v2/pokemon?offset=30&limit=30",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      };

      const mockPokemonResponse1: PokemonApiResponse = {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "https://example.com/bulbasaur.png" },
        types: [
          { slot: 1, type: { name: "grass" } },
          { slot: 2, type: { name: "poison" } },
        ],
        base_experience: 64,
        height: 7,
        weight: 69,
      };

      const mockPokemonResponse2: PokemonApiResponse = {
        id: 2,
        name: "ivysaur",
        sprites: { front_default: "https://example.com/ivysaur.png" },
        types: [
          { slot: 1, type: { name: "grass" } },
          { slot: 2, type: { name: "poison" } },
        ],
        base_experience: 142,
        height: 10,
        weight: 130,
      };

      mockHttpClient.get
        .mockResolvedValueOnce(new ApiResponse(mockListResponse, 200))
        .mockResolvedValueOnce(new ApiResponse(mockPokemonResponse1, 200))
        .mockResolvedValueOnce(new ApiResponse(mockPokemonResponse2, 200));

      const result = await repository.getAll(1, 30);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "pokemon?offset=0&limit=30",
      );
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/1/",
      );
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/2/",
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Pokemon);
      expect(result[0].id.getValue()).toBe(1);
      expect(result[0].name.getValue()).toBe("bulbasaur");
      expect(result[1].id.getValue()).toBe(2);
      expect(result[1].name.getValue()).toBe("ivysaur");
    });

    it("throws an error if fetching a Pokémon's details fails", async () => {
      const mockListResponse: PokemonApiListResponse = {
        count: 1281,
        next: "https://pokeapi.co/api/v2/pokemon?offset=30&limit=30",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      };

      mockHttpClient.get
        .mockResolvedValueOnce(new ApiResponse(mockListResponse, 200))
        .mockResolvedValueOnce(new ApiResponse(null, 404));

      await expect(repository.getAll(1, 30)).rejects.toThrow(
        "Failed to fetch details for Pokemon bulbasaur",
      );

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "pokemon?offset=0&limit=30",
      );
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/1/",
      );
    });
  });

  describe("getNames", () => {
    it("should return a list of PokemonName objects when the API call is successful", async () => {
      const mockResponse: PokemonApiListResponse = {
        count: 1281,
        next: null,
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        ],
      };

      const mockApiResponse = new ApiResponse(mockResponse, 200);
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      const result = await repository.getNames();

      expect(result).toEqual([
        PokemonName.fromString("bulbasaur"),
        PokemonName.fromString("ivysaur"),
        PokemonName.fromString("venusaur"),
      ]);
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "pokemon?offset=0&limit=10000",
      );
    });

    it("should throw an error if the API call is unsuccessful", async () => {
      const mockApiResponse = new ApiResponse(null, 500);
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      await expect(repository.getNames()).rejects.toThrow(
        "Failed to fetch Pokemon names",
      );
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "pokemon?offset=0&limit=10000",
      );
    });
  });
});
