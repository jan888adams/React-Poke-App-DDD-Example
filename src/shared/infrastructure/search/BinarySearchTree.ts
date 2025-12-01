import { TreeNode } from "./TreeNode";

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  public constructor(
    private compare: (a: T, b: T) => number,
    private getSearchableValue: (value: T) => string,
  ) {}

  public insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(value);
    }

    const comparison = this.compare(value, node.value);

    if (comparison < 0) {
      node.setLeft(this.insertNode(node.left, value));
    } else if (comparison > 0) {
      node.setRight(this.insertNode(node.right, value));
    }

    return node;
  }

  public findAllStartingWith(prefix: string): T[] {
    const results: T[] = [];
    this.findWithPrefix(this.root, prefix, results);

    return results;
  }

  private findWithPrefix(
    node: TreeNode<T> | null,
    prefix: string,
    results: T[],
  ): void {
    if (node === null) {
      return;
    }

    const nodeValue = this.getSearchableValue(node.value);

    if (nodeValue.startsWith(prefix)) {
      results.push(node.value);
      this.findWithPrefix(node.left, prefix, results);
      this.findWithPrefix(node.right, prefix, results);
    } else if (nodeValue < prefix) {
      this.findWithPrefix(node.right, prefix, results);
    } else {
      this.findWithPrefix(node.left, prefix, results);
    }
  }
}
