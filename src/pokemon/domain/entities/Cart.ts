import { Pokemon } from "./Pokemon";

export class Cart {
  private items: Pokemon[] = [];

  public add(pokemon: Pokemon) {
    if (!this.items.find((p) => p.getId() === pokemon.getId())) {
      this.items.push(pokemon);
      console.log("Added to cart:", pokemon.getCapitalizedName());
    }
  }
  public remove(PokemonId: number) {
    this.items = this.items.filter((p) => p.getId() !== PokemonId);
  }

  public getItems(): Pokemon[] {
    return [...this.items];
  }

  public clear() {
    this.items = [];
  }
}
