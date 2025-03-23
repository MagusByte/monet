import { query } from './query';

export class GraphNode<T> {
  public parent: GraphNode<T> | undefined = undefined;
  public firstChild: GraphNode<T> | undefined = undefined;
  public lastChild: GraphNode<T> | undefined = undefined;
  public previousSibling: GraphNode<T> | undefined = undefined;
  public nextSibling: GraphNode<T> | undefined = undefined;

  constructor(public readonly value: T) { }
}

export interface IModifyNode<T>{
  addChild(newChild: GraphNode<T>, beforeChild?: GraphNode<T>): void;
}

export class ModifyNode<T> implements IModifyNode<T>{
  constructor(private node: GraphNode<T>) {}

  addChild(newChild: GraphNode<T>, beforeChild?: GraphNode<T>): void {
    const parent = this.node;

    if (newChild === parent || query(newChild).isAncestorOf(parent)) {
      throw new Error("Cannot add a node as a child of itself or its ancestor.");
    }

    if (newChild.parent) {
      throw new Error("The newChild already has a parent.");
    }

    if (beforeChild && beforeChild.parent !== parent) {
      throw new Error("The beforeChild is not a child of this parent.");
    }

    newChild.parent = parent;

    if (!beforeChild) {
      // Add to the end
      if (!parent.lastChild) {
        parent.firstChild = parent.lastChild = newChild;
      } else {
        parent.lastChild.nextSibling = newChild;
        newChild.previousSibling = parent.lastChild;
        parent.lastChild = newChild;
      }
    } else {
      // Insert before beforeChild
      if (beforeChild.previousSibling) {
        beforeChild.previousSibling.nextSibling = newChild;
        newChild.previousSibling = beforeChild.previousSibling;
      } else {
        parent.firstChild = newChild;
      }
      newChild.nextSibling = beforeChild;
      beforeChild.previousSibling = newChild;
    }
  }
}

export function modify<T>(node: GraphNode<T>): IModifyNode<T> {
  return new ModifyNode<T>(node);
}
