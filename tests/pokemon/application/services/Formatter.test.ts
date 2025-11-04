import { Formatter } from "../../../../src/pokemon/application/services/Formatter";

describe("Formatter.capitalize", () => {
  it("capitalizes the first letter of a string", () => {
    expect(Formatter.capitalize("pikachu")).toBe("Pikachu");
    expect(Formatter.capitalize("electric")).toBe("Electric");
  });

  it("returns an empty string if input is empty", () => {
    expect(Formatter.capitalize("")).toBe("");
  });
});
