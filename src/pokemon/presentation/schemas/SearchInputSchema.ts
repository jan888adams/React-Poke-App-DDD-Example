import { z } from "zod";

export const SearchInputSchema = z.object({
  searchTerm: z
    .string()
    .min(1, "Please enter a Pokemon name or ID")
    .max(50, "Search term too long")
    .trim(),
});

export type PokemonSearchForm = z.infer<typeof SearchInputSchema>;
