import { AddPokemonToCart } from "../../../../src/pokemon/application/use-cases/AddPokemonToCart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { CartService } from "../../../../src/pokemon/application/services/CartService";

describe("AddPokemonToCart use case", () => {
  let mockCartService: {
    getCartItems: jest.Mock;
    addToCart: jest.Mock;
  };
  let useCase: AddPokemonToCart;
  let pikachu: Pokemon;
  let pikachuVariant: Pokemon;

  beforeEach(() => {
    mockCartService = {
      getCartItems: jest.fn(),
      addToCart: jest.fn(),
    };

    useCase = new AddPokemonToCart(mockCartService as unknown as CartService);

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

  it("should add pokemon to cart when not already present", () => {
    mockCartService.getCartItems.mockReturnValue([]);
    useCase.execute(pikachu);
    expect(mockCartService.addToCart).toHaveBeenCalledTimes(1);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(pikachu);
  });

  it("should not add pokemon if same id already exists in cart", () => {
    mockCartService.getCartItems.mockReturnValue([pikachu]);
    useCase.execute(pikachuVariant);
    expect(mockCartService.addToCart).not.toHaveBeenCalled();
  });
});
