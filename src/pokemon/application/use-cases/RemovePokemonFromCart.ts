import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartView } from "../views/CartView";
import { PokemonDto } from "../dtos/PokemonDto";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { PokemonId } from "../../domain/value-objects/pokemon/PokemonId";
import { CardId } from "../../domain/value-objects/cart/CartId";

export class RemovePokemonFromCart {
  public constructor(
    private readonly cartRepository: CartRepository,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  public async execute(pokemonDto: PokemonDto, cartId: string): Promise<void> {
    const pokemonId = PokemonId.fromNumber(pokemonDto.id);

    const cart = await this.cartRepository.findById(CardId.fromString(cartId));

    if (!cart || !cart.has(pokemonId)) {
      return;
    }

    cart.remove(pokemonId);

    await this.cartRepository.save(cart);

    this.emitter.emit("change", CartView.fromCart(cart));
  }
}
