import { PokemonView } from "../../application/views/PokemonView";

export const sortPokemons = (
  pokemons: PokemonView[],
  sortBy: "name" | "id",
  sortOrder: "asc" | "desc",
): PokemonView[] => {
  if (!pokemons) {
    return [];
  }

  return [...pokemons].sort((a, b) => {
    if (sortBy === "name") {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    } else if (sortBy === "id") {
      const comparison = a.id - b.id;
      return sortOrder === "asc" ? comparison : -comparison;
    }
    return 0;
  });
};
