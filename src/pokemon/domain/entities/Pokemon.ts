import { PokemonId } from "../value-objects/PokemonId";
import { PokemonName } from "../value-objects/PokemonName";
import { PokemonType } from "../value-objects/PokemonType";

export class Pokemon {
  constructor(
    private readonly id: PokemonId,
    private readonly name: PokemonName,
    private readonly sprites: { front_default: string | null },
    private readonly types: PokemonType[],
  ) {}

  getId(): number {
    return this.id.getValue();
  }

  getName(): string {
    return this.name.getValue();
  }

  getCapitalizedName(): string {
    return this.name.getCapitalized();
  }

  getImageUrl(): string | null {
    return this.sprites.front_default;
  }

  getTypes(): string[] {
    return this.types.map((type) => type.getName());
  }
}
