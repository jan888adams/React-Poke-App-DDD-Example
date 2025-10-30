export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  base_experience: number;
  height: number;
  weight: number;
}
