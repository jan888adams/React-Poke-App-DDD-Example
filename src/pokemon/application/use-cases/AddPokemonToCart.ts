import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartView } from "../views/CartView";
import { PokemonDto } from "../dtos/PokemonDto";

export class AddPokemonToCart {
  constructor(
    private readonly cart: Cart,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  execute(pokemonDto: PokemonDto): void {
    const pokemon = Pokemon.fromValues(
      pokemonDto.id,
      pokemonDto.name,
      pokemonDto.imageUrl,
      pokemonDto.types ?? [],
      pokemonDto.baseExperience,
      pokemonDto.height,
      pokemonDto.weight,
    );

    if (this.cart.has(pokemon.id)) {
      return;
    }

    this.cart.add(pokemon);

    this.emitter.emit("change", CartView.fromCart(this.cart));
  }
}
