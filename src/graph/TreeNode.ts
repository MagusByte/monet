export class TreeNode<T> {
  public parent: TreeNode<T> | undefined = undefined;
  public firstChild: TreeNode<T> | undefined = undefined;
  public lastChild: TreeNode<T> | undefined = undefined;
  public previousSibling: TreeNode<T> | undefined = undefined;
  public nextSibling: TreeNode<T> | undefined = undefined;

  constructor(public readonly value: T) { }
}
