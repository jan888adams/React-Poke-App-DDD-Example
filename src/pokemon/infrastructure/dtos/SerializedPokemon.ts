export interface SerializedPokemon {
  id: { value: number };
  name: { value: string };
  sprites: {
    front_default: string | null;
  };
  types: Array<{ value: string }>;
  baseExperience: number;
  height: number;
  weight: number;
}
