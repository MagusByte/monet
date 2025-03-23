import { TreeNode } from './TreeNode';
import { query } from './query';

/**
 * Creates a new instance of `ModifyNode` to modify the given graph node.
 *
 * @template T - The type of the value contained in the graph node.
 * @param node - The graph node to be modified.
 * @returns An instance of `IModifyNode<T>` that allows modifications to the graph node.
 */
export function modify<T>(node: TreeNode<T>): IModifyNode<T> {
  return new ModifyNode<T>(node);
}

/**
 * Interface representing the ability to modify a node in a graph structure.
 * Provides methods to add and remove child nodes.
 *
 * @typeParam T - The type of the value contained in the graph node.
 */
export interface IModifyNode<T> {
  /**
   * Adds a new child node to the current node.
   *
   * @param newChild - The new child node to be added.
   */
  addChild(newChild: TreeNode<T>): void;

  /**
   * Removes an existing child node from the current node.
   *
   * @param child - The child node to be removed.
   */
  removeChild(child: TreeNode<T>): void;
}

class ModifyNode<T> implements IModifyNode<T> {
  constructor(private node: TreeNode<T>) { }

  addChild(newChild: TreeNode<T>): void {
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

  removeChild(child: TreeNode<T>): void {
    const parent = this.node;

    if (child.parent !== parent) {
      throw new Error("The specified child is not a child of this node.");
    }

    // Update sibling links
    if (child.previousSibling) {
      child.previousSibling.nextSibling = child.nextSibling;
    } else {
      parent.firstChild = child.nextSibling;
    }

    if (child.nextSibling) {
      child.nextSibling.previousSibling = child.previousSibling;
    } else {
      parent.lastChild = child.previousSibling;
    }

    // Remove parent and sibling references
    child.parent = undefined;
    child.previousSibling = undefined;
    child.nextSibling = undefined;
  }
}
