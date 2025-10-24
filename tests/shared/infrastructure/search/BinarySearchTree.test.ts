import { BinarySearchTree } from "../../../../src/shared/infrastructure/search/BinarySearchTree";

describe("BinarySearchTree", () => {
  interface TestEntity {
    id: number;
    name: string;
  }

  let bst: BinarySearchTree<TestEntity>;

  beforeEach(() => {
    bst = new BinarySearchTree<TestEntity>(
      (a, b) => a.name.localeCompare(b.name),
      (value) => value.name,
    );
  });

  it("should insert values into the tree", () => {
    const entities = [
      { id: 1, name: "apple" },
      { id: 2, name: "banana" },
      { id: 3, name: "cherry" },
    ];

    entities.forEach((entity) => bst.insert(entity));

    const results = bst.findAllStartingWith("");
    expect(results).toEqual(
      entities.sort((a, b) => a.name.localeCompare(b.name)),
    );
  });

  it("should find values starting with a given prefix", () => {
    const entities = [
      { id: 1, name: "apple" },
      { id: 2, name: "apricot" },
      { id: 3, name: "banana" },
      { id: 4, name: "blueberry" },
    ];

    entities.forEach((entity) => bst.insert(entity));

    const results = bst.findAllStartingWith("ap");
    expect(results).toEqual([
      { id: 1, name: "apple" },
      { id: 2, name: "apricot" },
    ]);
  });

  it("should return an empty array if no values match the prefix", () => {
    const entities = [
      { id: 1, name: "apple" },
      { id: 2, name: "banana" },
      { id: 3, name: "cherry" },
    ];

    entities.forEach((entity) => bst.insert(entity));

    const results = bst.findAllStartingWith("z");
    expect(results).toEqual([]);
  });

  it("should handle an empty tree gracefully", () => {
    const results = bst.findAllStartingWith("a");
    expect(results).toEqual([]);
  });

  it("should find all values when the prefix is empty", () => {
    const entities = [
      { id: 1, name: "apple" },
      { id: 2, name: "banana" },
      { id: 3, name: "cherry" },
    ];

    entities.forEach((entity) => bst.insert(entity));

    const results = bst.findAllStartingWith("");
    expect(results).toEqual(
      entities.sort((a, b) => a.name.localeCompare(b.name)),
    );
  });

  it("should handle case sensitivity correctly", () => {
    const entities = [
      { id: 1, name: "Apple" },
      { id: 2, name: "banana" },
      { id: 3, name: "Cherry" },
    ];

    entities.forEach((entity) => bst.insert(entity));

    const results = bst.findAllStartingWith("A");
    expect(results).toEqual([{ id: 1, name: "Apple" }]);
  });
});
