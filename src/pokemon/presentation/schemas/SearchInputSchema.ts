import { z } from "zod";

export const SearchInputSchema = z.object({
  searchTerm: z
    .string()
    .min(1, "Please enter a Pokemon name or ID")
    .max(50, "Search term too long")
    .trim()
    .regex(
      /^[a-zA-Z0-9 -]+$/,
      "Only letters, numbers, spaces, and - are allowed",
    ),
});

export type PokemonSearchForm = z.infer<typeof SearchInputSchema>;
