import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartView } from "../views/CartView";
import { PokemonDto } from "../dtos/PokemonDto";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { PokemonId } from "../../domain/value-objects/PokemonId";

export class RemovePokemonFromCart {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  execute(pokemonDto: PokemonDto): void {
    const pokemonId = PokemonId.fromNumber(pokemonDto.id);

    const cart = this.cartRepository.findLast();

    if (!cart || !cart.has(pokemonId)) {
      return;
    }

    cart.remove(pokemonId);
    this.cartRepository.save(cart);

    this.emitter.emit("change", CartView.fromCart(cart));
  }
}
