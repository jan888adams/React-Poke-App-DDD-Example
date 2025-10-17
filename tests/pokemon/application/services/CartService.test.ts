import { CartService } from "../../../../src/pokemon/application/services/CartService";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { EventEmitter } from "../../../../src/shared/application/events/EventEmitter";
import { CartEvent } from "../../../../src/pokemon/application/events/CartEvent";

describe("CartService", () => {
  let cart: Cart;
  let service: CartService;
  let pikachu: Pokemon;
  let bulbasaur: Pokemon;

  beforeEach(() => {
    cart = new Cart();

    const handlers: {
      [K in keyof CartEvent]?: Array<(payload: CartEvent[K]) => void>;
    } = {};

    const mockEmitter: EventEmitter<CartEvent> = {
      on: (event, handler) => {
        handlers[event] = handlers[event] ?? [];
        handlers[event]!.push(
          handler as unknown as (payload: CartEvent[typeof event]) => void,
        );
      },
      off: (event, handler) => {
        handlers[event] = (handlers[event] ?? []).filter((h) => h !== handler);
      },
      emit: (event, payload) => {
        (handlers[event] ?? []).forEach((h) => h(payload));
      },
    };

    service = new CartService(cart, mockEmitter);

    pikachu = Pokemon.fromValues(
      25,
      "pikachu",
      "img",
      ["electric"],
      112,
      4,
      60,
    );
    bulbasaur = Pokemon.fromValues(1, "bulbasaur", "img", ["grass"], 64, 7, 69);
  });

  it("adds a pokemon to the cart", () => {
    service.addToCart(pikachu);
    expect(service.getCartItems()).toContain(pikachu);
  });

  it("emits change event when cart is updated", () => {
    const handler = jest.fn();
    service.onChange(handler);

    service.addToCart(pikachu);
    expect(handler).toHaveBeenCalledWith([pikachu]);

    service.addToCart(bulbasaur);
    expect(handler).toHaveBeenCalledWith([pikachu, bulbasaur]);

    service.offChange(handler);
  });
});
