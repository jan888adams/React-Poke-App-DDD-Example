import { z } from "zod";
import { SearchInputSchema } from "../../schemas/SearchInputSchema";

export type PokemonSearchForm = z.infer<typeof SearchInputSchema>;
