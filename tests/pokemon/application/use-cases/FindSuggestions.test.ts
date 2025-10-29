import { FindSuggestions } from "../../../../src/pokemon/application/use-cases/FindSuggestions";
import { SuggestionRepository } from "../../../../src/pokemon/domain/repositories/SuggestionRepository";
import { Suggestion } from "../../../../src/pokemon/domain/entities/Suggestion";

describe("FindSuggestions", () => {
  let findSuggestions: FindSuggestions;
  let mockSuggestionRepository: jest.Mocked<SuggestionRepository>;

  beforeEach(() => {
    mockSuggestionRepository = {
      search: jest.fn(),
      save: jest.fn(),
      hasSuggestions: jest.fn(),
    } as jest.Mocked<SuggestionRepository>;

    findSuggestions = new FindSuggestions(mockSuggestionRepository);
  });

  it("should return suggestions matching the term", async () => {
    const term = "bu";
    const suggestions = [
      Suggestion.fromObject({ id: "1", name: "bulbasaur" }),
      Suggestion.fromObject({ id: "2", name: "butterfree" }),
    ];

    (mockSuggestionRepository.search as jest.Mock).mockResolvedValue(
      suggestions,
    );

    const result = await findSuggestions.execute(term);

    expect(mockSuggestionRepository.search).toHaveBeenCalledWith(term);
    expect(result).toEqual(["bulbasaur", "butterfree"]);
  });

  it("should throw an error if the term is empty", async () => {
    await expect(findSuggestions.execute("")).rejects.toThrow(
      "Term must be a non-empty string",
    );
  });

  it("should return an empty array if no suggestions match the term", async () => {
    const term = "xyz";

    (mockSuggestionRepository.search as jest.Mock).mockResolvedValue([]);

    const result = await findSuggestions.execute(term);

    expect(mockSuggestionRepository.search).toHaveBeenCalledWith(term);
    expect(result).toEqual([]);
  });
});
