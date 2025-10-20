import { AddPokemonToCart } from "../../../../src/pokemon/application/use-cases/AddPokemonToCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { CartRepository } from "../../../../src/pokemon/domain/repositories/CartRepository";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { CartView } from "../../../../src/pokemon/application/views/CartView";

describe("AddPokemonToCart", () => {
  let mockCartRepository: jest.Mocked<CartRepository>;
  let mockEmitter: jest.Mocked<EventEmitter<CartEvent>>;
  let useCase: AddPokemonToCart;
  let cart: Cart;
  let pikachu: PokemonDto;

  beforeEach(() => {
    mockCartRepository = {
      findLast: jest.fn(),
      save: jest.fn(),
    };

    mockEmitter = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<EventEmitter<CartEvent>>;

    useCase = new AddPokemonToCart(mockCartRepository, mockEmitter);

    cart = Cart.empty();
    pikachu = {
      id: 25,
      name: "pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };
  });

  it("adds a Pokemon to the cart and emits a change event", () => {
    mockCartRepository.findLast.mockReturnValue(cart);

    useCase.execute(pikachu);

    expect(
      cart.has(
        Pokemon.fromValues(
          25,
          "pikachu",
          "https://example.com/pikachu.png",
          ["electric"],
          112,
          4,
          60,
        ).id,
      ),
    ).toBe(true);
    expect(mockCartRepository.save).toHaveBeenCalledWith(cart);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      CartView.fromCart(cart),
    );
  });

  it("creates and saves a new cart if no cart exists", () => {
    mockCartRepository.findLast.mockReturnValue(null);

    useCase.execute(pikachu);

    expect(mockCartRepository.findLast).toHaveBeenCalled();
    expect(mockCartRepository.save).toHaveBeenCalledTimes(2); // Once for creating the cart, once for saving after adding
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      expect.any(CartView),
    );
  });

  it("does not add a Pokemon if it is already in the cart", () => {
    cart.add(
      Pokemon.fromValues(
        25,
        "pikachu",
        "https://example.com/pikachu.png",
        ["electric"],
        112,
        4,
        60,
      ),
    );
    mockCartRepository.findLast.mockReturnValue(cart);

    useCase.execute(pikachu);

    expect(cart.getItems().length).toBe(1); // Ensure no duplicate is added
    expect(mockCartRepository.save).not.toHaveBeenCalledTimes(2); // Save should not be called again
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });
});
