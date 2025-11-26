import { renderHook, act } from "@testing-library/react";
import { usePokemonCart } from "../../../../src/pokemon/presentation/hooks/usePokemonCart";
import { CartContext } from "../../../../src/pokemon/presentation/context/CartContext";
import { CartView } from "../../../../src/pokemon/application/views/CartView";
import { PokemonDto } from "../../../../src/pokemon/application/dtos/PokemonDto";
import {
  addPokemonToCart,
  getPokemonCart,
  removePokemonFromCart,
} from "../../../../src/shared/infrastructure/di/DependencyContainer";

jest.mock(
  "../../../../src/shared/infrastructure/di/DependencyContainer",
  () => ({
    addPokemonToCart: { execute: jest.fn() },
    getPokemonCart: { execute: jest.fn() },
    removePokemonFromCart: { execute: jest.fn() },
  }),
);

describe("usePokemonCart", () => {
  const mockEmitter = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  };

  const mockCart: CartView = {
    id: "cart-1",
    items: [
      {
        id: 25,
        name: "Pikachu",
        imageUrl: "https://example.com/pikachu.png",
        altText: "Pikachu",
        types: ["electric"],
        baseExperience: 112,
        height: 4,
        weight: 60,
      },
    ],
    count: jest.fn(() => 1),
    has: jest.fn((id: number) => id === 25),
    isEmpty: jest.fn(() => false),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getPokemonCart.execute as jest.Mock).mockReturnValue(mockCart);
  });

  it("initializes with the cart from getPokemonCart", () => {
    const { result } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    expect(result.current.cart).toEqual(mockCart);
    expect(getPokemonCart.execute).toHaveBeenCalledTimes(1);
  });

  it("registers and unregisters the 'change' event listener", () => {
    const { unmount } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    expect(mockEmitter.on).toHaveBeenCalledWith("change", expect.any(Function));
    unmount();
    expect(mockEmitter.off).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("updates the cart when the 'change' event is emitted", () => {
    const { result } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    const newCart: CartView = {
      id: "cart-2",
      items: [
        {
          id: 1,
          name: "Bulbasaur",
          imageUrl: "https://example.com/bulbasaur.png",
          altText: "Bulbasaur",
          types: ["grass", "poison"],
          baseExperience: 64,
          height: 7,
          weight: 69,
        },
      ],
      count: jest.fn(() => 1),
      has: jest.fn((id: number) => id === 1),
      isEmpty: jest.fn(() => false),
    };

    const changeHandler = mockEmitter.on.mock.calls[0][1];
    act(() => {
      changeHandler(newCart);
    });

    expect(result.current.cart).toEqual(newCart);
  });

  it("executes addPokemonToCart when addToCart is called", () => {
    const { result } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    const pokemon: PokemonDto = {
      id: 1,
      name: "Bulbasaur",
      imageUrl: "https://example.com/bulbasaur.png",
      types: ["grass", "poison"],
      baseExperience: 64,
      height: 7,
      weight: 69,
    };

    act(() => {
      result.current.addToCart(pokemon);
    });

    expect(addPokemonToCart.execute).toHaveBeenCalledWith(pokemon, mockCart.id);
  });

  it("executes removePokemonFromCart when removeFromCart is called", () => {
    const { result } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    const pokemon: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };

    act(() => {
      result.current.removeFromCart(pokemon);
    });

    expect(removePokemonFromCart.execute).toHaveBeenCalledWith(
      pokemon,
      mockCart.id,
    );
  });

  it("does not call removePokemonFromCart if the cart is null", () => {
    (getPokemonCart.execute as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => usePokemonCart(), {
      wrapper: ({ children }) => (
        <CartContext.Provider value={mockEmitter}>
          {children}
        </CartContext.Provider>
      ),
    });

    const pokemon: PokemonDto = {
      id: 25,
      name: "Pikachu",
      imageUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      baseExperience: 112,
      height: 4,
      weight: 60,
    };

    act(() => {
      result.current.removeFromCart(pokemon);
    });

    expect(removePokemonFromCart.execute).not.toHaveBeenCalled();
  });
});
