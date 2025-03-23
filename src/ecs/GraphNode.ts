export class GraphNode<T> {
  public parent: GraphNode<T> | undefined = undefined;
  private _children: GraphNode<T>[] = [];

  constructor(public readonly value: T) { }

  getChildren(): GraphNode<T>[] {
    return this._children;
  }
}
