export class GraphNode<T> {
  public parent: GraphNode<T> | undefined = undefined;
  public firstChild: GraphNode<T> | undefined = undefined;
  public lastChild: GraphNode<T> | undefined = undefined;
  public previousSibling: GraphNode<T> | undefined = undefined;
  public nextSibling: GraphNode<T> | undefined = undefined;

  constructor(public readonly value: T) { }

  getChildren(): GraphNode<T>[] {
    const children: GraphNode<T>[] = [];
    let current = this.firstChild;
    while (current) {
      children.push(current);
      current = current.nextSibling;
    }
    return children;
  }

  addChild(newChild: GraphNode<T>, beforeChild?: GraphNode<T>): void {
    if (newChild === this || this.isAncestor(newChild)) {
      throw new Error("Cannot add a node as a child of itself or its ancestor.");
    }

    if (newChild.parent === this) {
      throw new Error("The newChild is already a child of this parent.");
    }

    if (beforeChild && beforeChild.parent !== this) {
      throw new Error("The beforeChild is not a child of this parent.");
    }

    // Remove newChild from its current parent if it has one
    if (newChild.parent) {
      newChild.parent.removeChild(newChild);
    }

    newChild.parent = this;

    if (!beforeChild) {
      // Add to the end
      if (!this.lastChild) {
        this.firstChild = this.lastChild = newChild;
      } else {
        this.lastChild.nextSibling = newChild;
        newChild.previousSibling = this.lastChild;
        this.lastChild = newChild;
      }
    } else {
      // Insert before beforeChild
      if (beforeChild.previousSibling) {
        beforeChild.previousSibling.nextSibling = newChild;
        newChild.previousSibling = beforeChild.previousSibling;
      } else {
        this.firstChild = newChild;
      }
      newChild.nextSibling = beforeChild;
      beforeChild.previousSibling = newChild;
    }
  }

  private isAncestor(node: GraphNode<T>): boolean {
    let current = this.parent;
    while (current) {
      if (current === node) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  private removeChild(child: GraphNode<T>): void {
    if (child.previousSibling) {
      child.previousSibling.nextSibling = child.nextSibling;
    } else {
      this.firstChild = child.nextSibling;
    }

    if (child.nextSibling) {
      child.nextSibling.previousSibling = child.previousSibling;
    } else {
      this.lastChild = child.previousSibling;
    }

    child.parent = undefined;
    child.previousSibling = undefined;
    child.nextSibling = undefined;
  }
}
