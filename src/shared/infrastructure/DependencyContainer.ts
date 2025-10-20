import { HttpClient } from "./http/HttpClient";
import { PokemonApiRepository } from "../../pokemon/infrastructure/repositories/PokemonApiRepository";
import { SearchPokemonByName } from "../../pokemon/application/use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../../pokemon/application/use-cases/SearchPokemonById";
import { PokemonFinder } from "../../pokemon/application/services/PokemonFinder";
import { AddPokemonToCart } from "../../pokemon/application/use-cases/AddPokemonToCart";
import { GetPokemonsFromCart } from "../../pokemon/application/use-cases/GetPokemonCart";
import { MittEventEmitterAdapter } from "./adapters/mitt/MittEventEmmiterAdapter";
import { CartEvent } from "../../pokemon/application/events/CartEvent";
import { CartLocalStorageRepository } from "../../pokemon/infrastructure/repositories/CartLocalStorageRepository";
import { RemovePokemonFromCart } from "../../pokemon/application/use-cases/RemovePokemonFromCart";

const httpClient = new HttpClient("https://pokeapi.co/api/v2/");
const pokemonRepository = new PokemonApiRepository(httpClient);

const searchPokemonByName = new SearchPokemonByName(pokemonRepository);
const searchPokemonById = new SearchPokemonById(pokemonRepository);

export const pokemonFinder = new PokemonFinder(
  searchPokemonByName,
  searchPokemonById,
);

const cartRepository = new CartLocalStorageRepository();

export const cartEventEmitter = new MittEventEmitterAdapter<CartEvent>();

export const addPokemonToCart = new AddPokemonToCart(
  cartRepository,
  cartEventEmitter,
);
export const getPokemonCart = new GetPokemonsFromCart(cartRepository);

export const removePokemonFromCart = new RemovePokemonFromCart(
  cartRepository,
  cartEventEmitter,
);
