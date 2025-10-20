import { AddPokemonToCart } from "../../../../src/pokemon/application/use-cases/AddPokemonToCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";

describe("AddPokemonToCart use case", () => {
  let cart: Cart;
  let mockEmitter: EventEmitter<CartEvent>;
  let useCase: AddPokemonToCart;
  let pikachu: Pokemon;
  let pikachuVariant: Pokemon;

  beforeEach(() => {
    cart = new Cart();

    mockEmitter = {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    };

    useCase = new AddPokemonToCart(cart, mockEmitter);

    pikachu = Pokemon.fromValues(
      25,
      "pikachu",
      "img",
      ["electric"],
      112,
      4,
      60,
    );
    pikachuVariant = Pokemon.fromValues(
      25,
      "pika",
      "img2",
      ["electric"],
      110,
      3,
      55,
    );
  });

  it("adds pokemon to cart and emits change", () => {
    useCase.execute(pikachu);

    const items = cart.getItems();
    expect(items).toContain(pikachu);
    expect((mockEmitter.emit as jest.Mock).mock.calls.length).toBeGreaterThan(
      0,
    );
    expect(mockEmitter.emit).toHaveBeenCalledWith("change", items);
  });

  it("does not add pokemon if same id already exists", () => {
    cart.add(pikachu);
    (mockEmitter.emit as jest.Mock).mockClear();

    useCase.execute(pikachuVariant);

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].getId()).toBe(pikachu.getId());
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });
});
