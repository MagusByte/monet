export class GraphNode<T> {
  public parent: GraphNode<T> | undefined = undefined;
  public firstChild: GraphNode<T> | undefined = undefined;
  public lastChild: GraphNode<T> | undefined = undefined;
  public previousSibling: GraphNode<T> | undefined = undefined;
  public nextSibling: GraphNode<T> | undefined = undefined;

  constructor(public readonly value: T) { }
}
