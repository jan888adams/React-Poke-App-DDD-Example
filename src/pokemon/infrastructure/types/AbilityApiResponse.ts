export interface AbilityApiResponse {
  id: number;
  name: string;
  generation: { name: string; url: string };
  effect_entries: { short_effect: string; language: { name: string } }[];
}
