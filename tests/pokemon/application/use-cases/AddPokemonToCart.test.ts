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
      findById: jest.fn(),
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
      abilities: [25],
      moves: [25],
    };
  });

  it("adds a Pokemon to the cart and emits a change event", async () => {
    mockCartRepository.findById.mockResolvedValue(cart);

    await useCase.execute(pikachu, cart.id.getValue());

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
          [{ id: 25 }],
          [{ id: 25 }],
        ).id,
      ),
    ).toBe(true);
    expect(mockCartRepository.save).toHaveBeenCalledWith(cart);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      CartView.fromCart(cart),
    );
  });

  it("creates and saves a new cart if no cart exists", async () => {
    mockCartRepository.findLast.mockResolvedValue(null);

    await useCase.execute(pikachu, null);

    expect(mockCartRepository.save).toHaveBeenCalledTimes(2);
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      expect.any(CartView),
    );
  });

  it("does not add a Pokemon if it is already in the cart", async () => {
    cart.add(
      Pokemon.fromValues(
        25,
        "pikachu",
        "https://example.com/pikachu.png",
        ["electric"],
        112,
        4,
        60,
        [{ id: 25 }],
        [{ id: 25 }],
      ),
    );
    mockCartRepository.findById.mockResolvedValue(cart);

    await useCase.execute(pikachu, cart.id.getValue());

    expect(cart.getItems().length).toBe(1);
    expect(mockCartRepository.save).not.toHaveBeenCalledTimes(2);
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });
});
