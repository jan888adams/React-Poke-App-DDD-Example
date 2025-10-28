import { SearchRepository } from "../../../shared/domain/repository/SearchRepository";
import { Suggestion } from "../entities/Suggestion";

export interface SuggestionRepository extends SearchRepository<Suggestion> {
  save(suggestions: Suggestion[]): Promise<void>;

  hasSuggestions(): Promise<boolean>;
}
