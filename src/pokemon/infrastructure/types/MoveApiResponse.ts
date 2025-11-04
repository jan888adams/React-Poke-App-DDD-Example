export interface MoveApiResponse {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  damage_class: { name: string };
}
