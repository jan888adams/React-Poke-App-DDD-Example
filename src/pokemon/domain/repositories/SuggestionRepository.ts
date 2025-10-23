import { SearchRepository } from "../../../shared/domain/repository/SearchRepository";
import { Suggestion } from "../entities/Suggestion";

export interface SuggestionRepository extends SearchRepository<Suggestion> {
  saveSuggestions(suggestions: Suggestion[]): Promise<void>;

  hasSuggestions(): Promise<boolean>;
}
