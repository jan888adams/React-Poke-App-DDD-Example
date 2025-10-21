import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartView } from "../views/CartView";
import { PokemonDto } from "../dtos/PokemonDto";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { CardId } from "../../domain/value-objects/cart/CartId";

export class AddPokemonToCart {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  execute(pokemonDto: PokemonDto, cartId: string | null): void {
    const pokemon = Pokemon.fromValues(
      pokemonDto.id,
      pokemonDto.name,
      pokemonDto.imageUrl,
      pokemonDto.types ?? [],
      pokemonDto.baseExperience,
      pokemonDto.height,
      pokemonDto.weight,
    );

    let cart: Cart | null;

    if (!cartId) {
      cart = Cart.empty();
      this.cartRepository.save(cart);
    } else {
      cart = this.cartRepository.findById(CardId.fromString(cartId));
    }

    if (!cart || cart.has(pokemon.id)) {
      return;
    }

    cart.add(pokemon);
    this.cartRepository.save(cart);

    this.emitter.emit("change", CartView.fromCart(cart));
  }
}
