import { GetPokemonCart } from "../../../../src/pokemon/application/use-cases/GetPokemonCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { CartRepository } from "../../../../src/pokemon/domain/repositories/CartRepository";
import { CartView } from "../../../../src/pokemon/application/views/CartView";

describe("GetPokemonCart", () => {
  let mockCartRepository: jest.Mocked<CartRepository>;
  let useCase: GetPokemonCart;

  beforeEach(() => {
    mockCartRepository = {
      findLast: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    useCase = new GetPokemonCart(mockCartRepository);
  });

  it("returns the existing cart as a CartView", async () => {
    const cart = Cart.empty();
    mockCartRepository.findLast.mockResolvedValue(cart);

    const result = await useCase.execute();

    expect(mockCartRepository.findLast).toHaveBeenCalled();
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(result).toStrictEqual(CartView.fromCart(cart));
  });

  it("returns null if no cart exists", async () => {
    mockCartRepository.findLast.mockResolvedValue(null);

    const result = await useCase.execute();

    expect(mockCartRepository.findLast).toHaveBeenCalled();
    expect(mockCartRepository.save).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
