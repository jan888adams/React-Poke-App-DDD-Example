import { HttpClient } from "./http/HttpClient";
import { PokemonApiRepository } from "../../pokemon/infrastructure/repositories/PokemonApiRepository";
import { SearchPokemonByName } from "../../pokemon/application/use-cases/SearchPokemonByName";
import { SearchPokemonById } from "../../pokemon/application/use-cases/SearchPokemonById";
import { PokemonFinder } from "../../pokemon/application/services/PokemonFinder";
import { CartService } from "../../pokemon/application/services/CartService";
import { Cart } from "../../pokemon/domain/entities/Cart";
import { AddPokemonToCart } from "../../pokemon/application/use-cases/AddPokemonToCart";
import { GetPokemonsFromCart } from "../../pokemon/application/use-cases/GetPokemonsFromCart";
import { MittEventEmitterAdapter } from "./adapters/mitt/MittEventEmmiterAdapter";
import { CartEvent } from "../../pokemon/application/events/CartEvent";

const httpClient = new HttpClient("https://pokeapi.co/api/v2/");
const pokemonRepository = new PokemonApiRepository(httpClient);

const searchPokemonByName = new SearchPokemonByName(pokemonRepository);
const searchPokemonById = new SearchPokemonById(pokemonRepository);

export const pokemonFinder = new PokemonFinder(
  searchPokemonByName,
  searchPokemonById,
);

const cart = new Cart();

export const cartEventEmitter = new MittEventEmitterAdapter<CartEvent>();

export const cartService = new CartService(cart, cartEventEmitter);

export const addPokemonToCart = new AddPokemonToCart(cartService);
export const getPokemonsFromCart = new GetPokemonsFromCart(cartService);
