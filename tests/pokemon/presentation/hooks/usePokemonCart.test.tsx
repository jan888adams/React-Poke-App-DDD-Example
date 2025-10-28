import { renderHook, act } from "@testing-library/react-hooks";
import { usePokemonCart } from "../../../../src/pokemon/presentation/hooks/usePokemonCart";
import { CartView } from "../../../../src/pokemon/application/views/CartView";
import { CartContext } from "../../../../src/pokemon/presentation/context/CartContext";
import {
  addPokemonToCart,
  getPokemonCart,
  removePokemonFromCart,
} from "../../../../src/shared/infrastructure/di/DependencyContainer";

jest.mock("../../../../src/shared/infrastructure/di/DependencyContainer");

describe("usePokemonCart", () => {
  let mockCart: CartView;

  beforeEach(() => {
    mockCart = {
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
      count: jest.fn(() => mockCart.items.length),
      has: jest.fn((id: number) =>
        mockCart.items.some((item) => item.id === id),
      ),
      isEmpty: jest.fn(() => mockCart.items.length === 0),
    };

    (getPokemonCart.execute as jest.Mock).mockResolvedValue(mockCart);
    (addPokemonToCart.execute as jest.Mock).mockResolvedValue(undefined);
    (removePokemonFromCart.execute as jest.Mock).mockResolvedValue(undefined);
  });

  it("initializes with the cart from getPokemonCart", async () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartContext.Provider value={null}>{children}</CartContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => usePokemonCart(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.cart).toEqual(mockCart);
    expect(getPokemonCart.execute).toHaveBeenCalledTimes(1);
  });

  it("executes addPokemonToCart when addToCart is called", async () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartContext.Provider value={null}>{children}</CartContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => usePokemonCart(), {
      wrapper,
    });

    await waitForNextUpdate();

    const pokemon = {
      id: 1,
      name: "Bulbasaur",
      imageUrl: "https://example.com/bulbasaur.png",
      types: ["grass", "poison"],
      baseExperience: 64,
      height: 7,
      weight: 69,
    };

    await act(async () => {
      await result.current.addToCart(pokemon);
    });

    expect(addPokemonToCart.execute).toHaveBeenCalledWith(pokemon, mockCart.id);
  });

  it("executes removePokemonFromCart when removeFromCart is called", async () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartContext.Provider value={null}>{children}</CartContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => usePokemonCart(), {
      wrapper,
    });

    await waitForNextUpdate();

    const pokemon = mockCart.items[0];

    await act(async () => {
      await result.current.removeFromCart(pokemon);
    });

    expect(removePokemonFromCart.execute).toHaveBeenCalledWith(
      pokemon,
      mockCart.id,
    );
  });
});
