import { CartService } from "../../../../src/pokemon/application/services/CartService";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";

describe("CartService", () => {
  let cart: Cart;
  let service: CartService;
  let pikachu: Pokemon;
  let bulbasaur: Pokemon;

  beforeEach(() => {
    cart = new Cart();
    service = new CartService(cart);
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

  it("removes a pokemon from the cart", () => {
    service.addToCart(pikachu);
    service.removeFromCart(pikachu.getId());
    expect(service.getCartItems()).not.toContain(pikachu);
  });

  it("clears the cart", () => {
    service.addToCart(pikachu);
    service.addToCart(bulbasaur);
    service.clearCart();
    expect(service.getCartItems()).toHaveLength(0);
  });

  it("emits change event when cart is updated", () => {
    const handler = jest.fn();
    service.onChange(handler);

    service.addToCart(pikachu);
    expect(handler).toHaveBeenCalledWith([pikachu]);

    service.addToCart(bulbasaur);
    expect(handler).toHaveBeenCalledWith([pikachu, bulbasaur]);

    service.removeFromCart(pikachu.getId());
    expect(handler).toHaveBeenCalledWith([bulbasaur]);

    service.clearCart();
    expect(handler).toHaveBeenCalledWith([]);

    service.offChange(handler);
  });
});
