export class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  public constructor(public value: T) {}

  public setLeft(node: TreeNode<T> | null): void {
    this.left = node;
  }

  public setRight(node: TreeNode<T> | null): void {
    this.right = node;
  }
}
