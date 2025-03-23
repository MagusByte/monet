import { GraphNode } from './GraphNode';
import { query } from './query';

export interface IModifyNode<T> {
  addChild(newChild: GraphNode<T>): void;
}

export class ModifyNode<T> implements IModifyNode<T> {
  constructor(private node: GraphNode<T>) {}

  addChild(newChild: GraphNode<T>): void {
    const parent = this.node;

    if (newChild === parent || query(newChild).isAncestorOf(parent)) {
      throw new Error("Cannot add a node as a child of itself or its ancestor.");
    }

    if (newChild.parent) {
      throw new Error("The newChild already has a parent.");
    }

    newChild.parent = parent;

    // Always add to the end
    if (!parent.lastChild) {
      parent.firstChild = parent.lastChild = newChild;
    } else {
      parent.lastChild.nextSibling = newChild;
      newChild.previousSibling = parent.lastChild;
      parent.lastChild = newChild;
    }
  }
}

export function modify<T>(node: GraphNode<T>): IModifyNode<T> {
  return new ModifyNode<T>(node);
}
