import { GetPokemonsFromCart } from "../../../../src/pokemon/application/use-cases/GetPokemonsFromCart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";
import { CartService } from "../../../../src/pokemon/application/services/CartService";

describe("GetPokemonsFromCart use case", () => {
  let mockCartService: Partial<CartService>;
  let useCase: GetPokemonsFromCart;
  let pikachu: Pokemon;
  let bulbasaur: Pokemon;

  beforeEach(() => {
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

    mockCartService = {
      getCartItems: jest.fn(),
    };

    useCase = new GetPokemonsFromCart(
      mockCartService as unknown as CartService,
    );
  });

  it("returns the list of pokemons from the cart service", () => {
    (mockCartService.getCartItems as jest.Mock).mockReturnValue([
      pikachu,
      bulbasaur,
    ]);

    const items = useCase.execute();

    expect(items).toEqual([pikachu, bulbasaur]);
    expect(mockCartService.getCartItems).toHaveBeenCalledTimes(1);
  });

  it("returns an empty array when cart is empty", () => {
    (mockCartService.getCartItems as jest.Mock).mockReturnValue([]);

    const items = useCase.execute();

    expect(items).toEqual([]);
    expect(mockCartService.getCartItems).toHaveBeenCalledTimes(1);
  });
});
