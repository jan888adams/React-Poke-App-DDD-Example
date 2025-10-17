import { Pokemon } from "./Pokemon";

export class Cart {
  private items: Pokemon[] = [];

  public add(pokemon: Pokemon) {
    this.items.push(pokemon);
  }

  public getItems(): Pokemon[] {
    return [...this.items];
  }
}
