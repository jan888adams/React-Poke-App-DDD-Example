import { CartLocalStorageRepository } from "../../../../src/pokemon/infrastructure/repositories/CartLocalStorageRepository";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { CardId } from "../../../../src/pokemon/domain/value-objects/cart/CartId";

describe("CartLocalStorageRepository", () => {
  let repository: CartLocalStorageRepository;
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    } as unknown as Storage;

    repository = new CartLocalStorageRepository(mockStorage);
  });

  it("saves a cart to localStorage", () => {
    const cart = Cart.empty();
    const pokemon = Pokemon.fromValues(
      25,
      "Pikachu",
      "https://example.com/pikachu.png",
      ["electric"],
      112,
      4,
      60,
    );
    cart.add(pokemon);

    repository.save(cart);

    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "pokemon_cart_last",
      `pokemon_cart_${cart.id.getValue()}`,
    );
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      `pokemon_cart_${cart.id.getValue()}`,
      JSON.stringify({
        id: cart.id.getValue(),
        items: [
          {
            id: 25,
            name: "Pikachu",
            imageUrl: "https://example.com/pikachu.png",
            altText: "pikachu", // Include the altText property
            types: ["electric"],
            baseExperience: 112,
            height: 4,
            weight: 60,
          },
        ],
      }),
    );
  });

  it("retrieves the last saved cart from localStorage", () => {
    const cartId = "cart-1";
    const cartData = JSON.stringify({
      id: cartId,
      items: [
        {
          id: 25,
          name: "Pikachu",
          imageUrl: "https://example.com/pikachu.png",
          types: ["electric"],
          baseExperience: 112,
          height: 4,
          weight: 60,
        },
      ],
    });

    (mockStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === "pokemon_cart_last") {
        return `pokemon_cart_${cartId}`;
      }
      if (key === `pokemon_cart_${cartId}`) {
        return cartData;
      }
      return null;
    });

    const cart = repository.findLast();

    expect(cart).not.toBeNull();
    expect(cart?.id.getValue()).toBe(cartId);
    expect(cart?.getItems()).toHaveLength(1);
    expect(cart?.getItems()[0].name.value).toBe("pikachu");
  });

  it("returns null if no last cart is found", () => {
    (mockStorage.getItem as jest.Mock).mockReturnValue(null);

    const cart = repository.findLast();

    expect(cart).toBeNull();
  });

  it("retrieves a cart by ID from localStorage", () => {
    const cartId = "cart-1";
    const cartData = JSON.stringify({
      id: cartId,
      items: [
        {
          id: 25,
          name: "pikachu",
          imageUrl: "https://example.com/pikachu.png",
          types: ["electric"],
          baseExperience: 112,
          height: 4,
          weight: 60,
        },
      ],
    });

    (mockStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === `pokemon_cart_${cartId}`) {
        return cartData;
      }
      return null;
    });

    const cart = repository.findById(CardId.fromString(cartId));

    expect(cart).not.toBeNull();
    expect(cart?.id.getValue()).toBe(cartId);
    expect(cart?.getItems()).toHaveLength(1);
    expect(cart?.getItems()[0].name.value).toBe("pikachu");
  });

  it("returns null if the cart ID is not found", () => {
    (mockStorage.getItem as jest.Mock).mockReturnValue(null);

    const cart = repository.findById(CardId.fromString("non-existent-id"));

    expect(cart).toBeNull();
  });
});
