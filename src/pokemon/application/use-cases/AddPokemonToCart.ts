import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { PokemonId } from "../../domain/value-objects/PokemonId";

export class AddPokemonToCart {
  constructor(
    private readonly cart: Cart,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  execute(pokemon: Pokemon): void {
    if (this.cart.has(PokemonId.fromNumber(pokemon.getId()))) {
      return;
    }

    this.cart.add(pokemon);
    this.emitter.emit("change", this.cart.getItems());
  }
}
