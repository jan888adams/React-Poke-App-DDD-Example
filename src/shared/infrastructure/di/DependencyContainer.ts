import { HttpClient } from "../http/HttpClient";
import { PokemonApiRepository } from "../../../pokemon/infrastructure/repositories/PokemonApiRepository";
import { SearchPokemonByName } from "../../../pokemon/application/use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../../../pokemon/application/use-cases/SearchPokemonById";
import { AddPokemonToCart } from "../../../pokemon/application/use-cases/AddPokemonToCart";
import { GetPokemonCart } from "../../../pokemon/application/use-cases/GetPokemonCart";
import { MittEventEmitterAdapter } from "../adapters/mitt/MittEventEmmiterAdapter";
import { CartEvent } from "../../../pokemon/application/events/CartEvent";
import { CartLocalStorageRepository } from "../../../pokemon/infrastructure/repositories/CartLocalStorageRepository";
import { RemovePokemonFromCart } from "../../../pokemon/application/use-cases/RemovePokemonFromCart";
import { GetPokemons } from "../../../pokemon/application/use-cases/GetPokemons";
import { GetPokemonNames } from "../../../pokemon/application/use-cases/GetPokemonNames";
import { CreateSuggestions } from "../../../pokemon/application/use-cases/CreateSuggestions";
import { SuggestionLocalStorageRepository } from "../../../pokemon/infrastructure/repositories/SuggestionLocalStorageRepository";
import { FindSuggestions } from "../../../pokemon/application/use-cases/FindSuggestions";
import { SuggestionSearchAdapter } from "../../../pokemon/infrastructure/adapters/SuggestionSearchAdapter";
import { GetAbilitiesForPokemon } from "../../../pokemon/application/use-cases/GetAbilitiesForPokemon";
import { AbilityApiRepository } from "../../../pokemon/infrastructure/repositories/AbilityApiRepository";
import { GetMovesForPokemon } from "../../../pokemon/application/use-cases/GetMovesForPokemon";
import { MoveApiRepository } from "../../../pokemon/infrastructure/repositories/MoveApiRepository";

const httpClient = new HttpClient("https://pokeapi.co/api/v2/");
const pokemonRepository = new PokemonApiRepository(httpClient);

export const searchPokemonByName = new SearchPokemonByName(pokemonRepository);
export const searchPokemonById = new SearchPokemonById(pokemonRepository);

const cartRepository = new CartLocalStorageRepository("pokemon_cart");

export const cartEventEmitter = new MittEventEmitterAdapter<CartEvent>();

export const addPokemonToCart = new AddPokemonToCart(
  cartRepository,
  cartEventEmitter,
);
export const getPokemonCart = new GetPokemonCart(cartRepository);

export const removePokemonFromCart = new RemovePokemonFromCart(
  cartRepository,
  cartEventEmitter,
);

export const getPokemons = new GetPokemons(pokemonRepository);

export const getPokemonNames = new GetPokemonNames(pokemonRepository);

export const searchAdapter = new SuggestionSearchAdapter();
export const suggestionRepository = new SuggestionLocalStorageRepository(
  searchAdapter,
  "pokemon_suggestions",
);

export const createSuggestions = new CreateSuggestions(
  pokemonRepository,
  suggestionRepository,
);

export const findSuggestions = new FindSuggestions(suggestionRepository);

export const abilityApiRepository = new AbilityApiRepository(httpClient);

export const getAbilitiesForPokemon = new GetAbilitiesForPokemon(
  abilityApiRepository,
);

export const moveApiRepository = new MoveApiRepository(httpClient);

export const getMovesForPokemon = new GetMovesForPokemon(moveApiRepository);
