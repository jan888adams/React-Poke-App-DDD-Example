import { RemovePokemonFromCart } from "../../../../src/pokemon/application/use-cases/RemovePokemonFromCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { CartRepository } from "../../../../src/pokemon/domain/repositories/CartRepository";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";

describe("RemovePokemonFromCart", () => {
  let mockCartRepository: jest.Mocked<CartRepository>;
  let mockEmitter: jest.Mocked<EventEmitter<CartEvent>>;
  let useCase: RemovePokemonFromCart;
  let cart: Cart;
  let pikachu: Pokemon;

  beforeEach(() => {
    mockCartRepository = {
      findLast: jest.fn(),
      save: jest.fn(),
    };

    mockEmitter = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<EventEmitter<CartEvent>>;

    useCase = new RemovePokemonFromCart(mockCartRepository, mockEmitter);

    cart = Cart.empty();
    pikachu = Pokemon.fromValues(
      25,
      "pikachu",
      "https://example.com/pikachu.png",
      ["electric"],
      112,
      4,
      60,
    );
    cart.add(pikachu);
  });

  it("removes a Pokemon from the cart and emits a change event", () => {
    mockCartRepository.findLast.mockReturnValue(cart);

    const pokemonDto: PokemonDto = {
      id: 25,
      name: "pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };

    useCase.execute(pokemonDto);

    expect(cart.has(pikachu.id)).toBe(false);
    expect(mockCartRepository.save).toHaveBeenCalledWith(cart);
    expect(mockEmitter.emit).toHaveBeenCalledWith("change", expect.anything());
  });

  it("does nothing if the cart does not exist", () => {
    mockCartRepository.findLast.mockReturnValue(null);

    const pokemonDto: PokemonDto = {
      id: 999,
      name: "unknown",
      imageUrl: "",
      types: [],
      baseExperience: 0,
      height: 0,
      weight: 0,
    };

    useCase.execute(pokemonDto);

    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });

  it("does nothing if the Pokemon is not in the cart", () => {
    mockCartRepository.findLast.mockReturnValue(cart);

    const pokemonDto: PokemonDto = {
      id: 999,
      name: "unknown",
      imageUrl: "",
      types: [],
      baseExperience: 0,
      height: 0,
      weight: 0,
    };

    useCase.execute(pokemonDto);

    const unknownPokemon = Pokemon.fromValues(999, "unknown", "", [], 0, 0, 0);

    expect(cart.has(unknownPokemon.id)).toBe(false);
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });
});
