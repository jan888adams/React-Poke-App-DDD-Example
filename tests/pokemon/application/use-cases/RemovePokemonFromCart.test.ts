import { RemovePokemonFromCart } from "../../../../src/pokemon/application/use-cases/RemovePokemonFromCart";
import { CartRepository } from "../../../../src/pokemon/domain/repositories/CartRepository";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";
import { CardId } from "../../../../src/pokemon/domain/value-objects/cart/CartId";
import { CartView } from "../../../../src/pokemon/application/views/CartView";

describe("RemovePokemonFromCart", () => {
  let mockCartRepository: jest.Mocked<CartRepository>;
  let mockEmitter: jest.Mocked<EventEmitter<CartEvent>>;
  let useCase: RemovePokemonFromCart;
  let cart: Cart;

  beforeEach(() => {
    mockCartRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findLast: jest.fn(),
    };

    mockEmitter = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<EventEmitter<CartEvent>>;

    useCase = new RemovePokemonFromCart(mockCartRepository, mockEmitter);

    cart = Cart.empty();
    cart.add(
      Pokemon.fromValues(
        25,
        "Pikachu",
        "https://example.com/pikachu.png",
        ["electric"],
        112,
        4,
        60,
      ),
    );
  });

  it("removes a Pokemon from the cart and emits a change event", async () => {
    const cartId = cart.id.getValue();
    mockCartRepository.findById.mockResolvedValue(cart);

    const pokemonDto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };

    await useCase.execute(pokemonDto, cartId);

    expect(mockCartRepository.findById).toHaveBeenCalledWith(
      CardId.fromString(cartId),
    );
    expect(mockCartRepository.save).toHaveBeenCalledWith(cart);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      CartView.fromCart(cart),
    );
    expect(cart.getItems()).toHaveLength(0);
  });

  it("does nothing if the cart does not exist", async () => {
    mockCartRepository.findById.mockResolvedValue(null);

    const pokemonDto: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };

    await useCase.execute(pokemonDto, "non-existent-cart-id");

    expect(mockCartRepository.findById).toHaveBeenCalledWith(
      CardId.fromString("non-existent-cart-id"),
    );
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });

  it("does nothing if the Pokémon is not in the cart", async () => {
    const cartId = cart.id.getValue();
    mockCartRepository.findById.mockResolvedValue(cart);

    const pokemonDto: PokemonDto = {
      id: 1,
      name: "Bulbasaur",
      imageUrl: "https://example.com/bulbasaur.png",
      types: ["grass", "poison"],
      baseExperience: 64,
      height: 7,
      weight: 69,
    };

    await useCase.execute(pokemonDto, cartId);

    expect(mockCartRepository.findById).toHaveBeenCalledWith(
      CardId.fromString(cartId),
    );
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(mockEmitter.emit).not.toHaveBeenCalled();
    expect(cart.getItems()).toHaveLength(1);
  });
});
