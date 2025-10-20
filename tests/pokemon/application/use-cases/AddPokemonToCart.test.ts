import { AddPokemonToCart } from "../../../../src/pokemon/application/use-cases/AddPokemonToCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";
import { PokemonView } from "../../../../src/pokemon/application/views/PokemonView";
import { CartView } from "../../../../src/pokemon/application/views/CartView";

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
    useCase.execute(
      PokemonDto.fromPokemonView(PokemonView.fromPokemon(pikachu)),
    );
    const items = cart.getItems();
    expect(items).toContainEqual(pikachu);
    expect((mockEmitter.emit as jest.Mock).mock.calls.length).toBeGreaterThan(
      0,
    );
    expect(mockEmitter.emit).toHaveBeenCalledWith(
      "change",
      CartView.fromCart(cart),
    );
  });

  it("does not add pokemon if same id already exists", () => {
    cart.add(pikachu);
    (mockEmitter.emit as jest.Mock).mockClear();

    useCase.execute(
      PokemonDto.fromPokemonView(PokemonView.fromPokemon(pikachuVariant)),
    );

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].id).toEqual(pikachu.id);
    expect(mockEmitter.emit).not.toHaveBeenCalled();
  });
});
