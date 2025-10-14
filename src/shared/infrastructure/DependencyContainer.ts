import { HttpClient } from "./http/HttpClient";
import { PokemonApiRepository } from "../../pokemon/infrastructure/repositories/PokemonApiRepository";
import { SearchPokemonByName } from "../../pokemon/application/use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../../pokemon/application/use-cases/SearchPokemonById";
import { PokemonFinder } from "../../pokemon/application/services/PokemonFinder";

const httpClient = new HttpClient("https://pokeapi.co/api/v2/");
const pokemonRepository = new PokemonApiRepository(httpClient);

const searchPokemonByName = new SearchPokemonByName(pokemonRepository);
const searchPokemonById = new SearchPokemonById(pokemonRepository);

export const pokemonFinder = new PokemonFinder(
  searchPokemonByName,
  searchPokemonById,
);
