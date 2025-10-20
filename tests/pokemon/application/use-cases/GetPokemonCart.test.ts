import { GetPokemonsFromCart } from "../../../../src/pokemon/application/use-cases/GetPokemonCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { CartRepository } from "../../../../src/pokemon/domain/repositories/CartRepository";
import { CartView } from "../../../../src/pokemon/application/views/CartView";

describe("GetPokemonsFromCart", () => {
  let mockCartRepository: jest.Mocked<CartRepository>;
  let useCase: GetPokemonsFromCart;

  beforeEach(() => {
    mockCartRepository = {
      findLast: jest.fn(),
      save: jest.fn(),
    };

    useCase = new GetPokemonsFromCart(mockCartRepository);
  });

  it("returns the existing cart as a CartView", () => {
    const cart = Cart.empty();
    mockCartRepository.findLast.mockReturnValue(cart);

    const result = useCase.execute();

    expect(mockCartRepository.findLast).toHaveBeenCalled();
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(result).toStrictEqual(CartView.fromCart(cart));
  });

  it("creates and saves a new cart if no cart exists", () => {
    mockCartRepository.findLast.mockReturnValue(null);

    const result = useCase.execute();

    expect(mockCartRepository.findLast).toHaveBeenCalled();
    expect(mockCartRepository.save).toHaveBeenCalledWith(expect.any(Cart));
    expect(result).toStrictEqual(CartView.fromCart(Cart.empty()));
  });
});
