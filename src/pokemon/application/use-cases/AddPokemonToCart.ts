import { Cart } from "../../domain/entities/Cart";
import { Pokemon } from "../../domain/entities/Pokemon";
import { CartEvent } from "../events/CartEvent";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartView } from "../views/CartView";
import { PokemonDto } from "../dtos/PokemonDto";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { CardId } from "../../domain/value-objects/cart/CartId";

export class AddPokemonToCart {
  public constructor(
    private readonly cartRepository: CartRepository,
    private readonly emitter: EventEmitter<CartEvent>,
  ) {}

  public async execute(
    pokemonDto: PokemonDto,
    cartId: string | null,
  ): Promise<void> {
    const pokemon = Pokemon.fromValues(
      pokemonDto.id,
      pokemonDto.name,
      pokemonDto.imageUrl,
      pokemonDto.types ?? [],
      pokemonDto.baseExperience,
      pokemonDto.height,
      pokemonDto.weight,
      pokemonDto.abilities.map((id) => ({ id })),
      pokemonDto.moves.map((id) => ({ id })),
    );

    let cart: Cart | null;

    if (!cartId) {
      cart = Cart.empty();
      await this.cartRepository.save(cart);
    } else {
      cart = await this.cartRepository.findById(CardId.fromString(cartId));
    }

    if (!cart || cart.has(pokemon.id)) {
      return;
    }

    cart.add(pokemon);

    await this.cartRepository.save(cart);

    this.emitter.emit("change", CartView.fromCart(cart));
  }
}
