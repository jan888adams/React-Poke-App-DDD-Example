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
  abilities: Array<{
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  moves: Array<{
    slot: number;
    move: {
      name: string;
      url: string;
    };
  }>;
}
