import { GetPokemonsFromCart } from "../../../../src/pokemon/application/use-cases/GetPokemonsFromCart";
import { Cart } from "../../../../src/pokemon/domain/entities/Cart";
import { Pokemon } from "../../../../src/pokemon/domain/entities/Pokemon";

describe("GetPokemonsFromCart use case", () => {
  let cart: Cart;
  let useCase: GetPokemonsFromCart;
  let pikachu: Pokemon;
  let bulbasaur: Pokemon;

  beforeEach(() => {
    cart = new Cart();
    useCase = new GetPokemonsFromCart(cart);

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

  it("returns the list of pokemons currently in the cart", () => {
    cart.add(pikachu);
    cart.add(bulbasaur);

    const items = useCase.execute();

    expect(items).toEqual([pikachu, bulbasaur]);
  });

  it("returns an empty array when the cart has no pokemons", () => {
    const items = useCase.execute();
    expect(items).toEqual([]);
  });
});
