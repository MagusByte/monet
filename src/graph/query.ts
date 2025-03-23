import { TreeNode } from './TreeNode';

/**
 * Creates a query node for the given graph node.
 *
 * @template T - The type of the data contained in the graph node.
 * @param subject - The graph node to query.
 * @returns An instance of `IQueryNode<T>` that allows querying operations on the graph node.
 */
export function query<T>(subject: TreeNode<T>): IQueryNode<T> {
  return new QueryNode(subject);
}

/**
 * Represents a query node in a graph structure, providing methods to traverse
 * and query relationships between nodes such as parent, child, ancestor, and descendant.
 *
 * @template T - The type of data stored in the graph nodes.
 */
export interface IQueryNode<T> {
  /**
   * Determines if the current node is an ancestor of the specified descendant node.
   *
   * @param descendent - The node to check against.
   * @returns `true` if the current node is an ancestor of the specified node, otherwise `false`.
   */
  isAncestorOf(descendent: TreeNode<T>): boolean;

  /**
   * Determines if the current node is the parent of the specified child node.
   *
   * @param child - The node to check against.
   * @returns `true` if the current node is the parent of the specified node, otherwise `false`.
   */
  isParentOf(child: TreeNode<T>): boolean;

  /**
   * Determines if the current node is a child of the specified parent node.
   *
   * @param parent - The node to check against.
   * @returns `true` if the current node is a child of the specified node, otherwise `false`.
   */
  isChildOf(parent: TreeNode<T>): boolean;

  /**
   * Determines if the current node is a descendant of the specified ancestor node.
   *
   * @param ancestor - The node to check against.
   * @returns `true` if the current node is a descendant of the specified node, otherwise `false`.
   */
  isDescendentOf(ancestor: TreeNode<T>): boolean;

  /**
   * Retrieves all children of the current node.
   *
   * @yields Each child node of the current node.
   */
  getChildren(): Generator<TreeNode<T>>;

  /**
   * Retrieves all ancestors of the current node, starting from the immediate parent
   * and moving up the hierarchy.
   *
   * @yields Each ancestor node of the current node.
   */
  getAncestors(): Generator<TreeNode<T>>;

  /**
   * Retrieves the parent of the current node.
   *
   * @returns The parent node if it exists, otherwise `undefined`.
   */
  getParent(): TreeNode<T> | undefined;

  /**
   * Retrieves all descendants of the current node in the specified traversal order.
   *
   * @param order - The traversal order, either "breadth-first" or "depth-first".
   *                Defaults to "depth-first".
   * @yields Each descendant node of the current node in the specified order.
   */
  getDescendents(order?: "breadth-first" | "depth-first"): Generator<TreeNode<T>>;
}

class QueryNode<T> implements IQueryNode<T> {
  private readonly subject: TreeNode<T>;

  constructor(subject: TreeNode<T>) {
    this.subject = subject;
  }

  isAncestorOf(descendent: TreeNode<T>): boolean {
    let current = descendent.parent;
    while (current) {
      if (current === this.subject) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  isParentOf(child: TreeNode<T>): boolean {
    return child.parent === this.subject;
  }

  isChildOf(parent: TreeNode<T>): boolean {
    return this.subject.parent === parent;
  }

  isDescendentOf(ancestor: TreeNode<T>): boolean {
    let current = this.subject.parent;
    while (current) {
      if (current === ancestor) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  *getChildren(): Generator<TreeNode<T>> {
    let current = this.subject.firstChild;
    while (current) {
      yield current;
      current = current.nextSibling;
    }
  }

  *getAncestors(): Generator<TreeNode<T>> {
    let current = this.subject.parent;
    while (current) {
      yield current;
      current = current.parent;
    }
  }

  getParent(): TreeNode<T> | undefined {
    return this.subject.parent;
  }

  *getDescendents(order: "breadth-first" | "depth-first" = "depth-first"): Generator<TreeNode<T>> {
    if (order === "depth-first") {
      const stack: TreeNode<T>[] = [];
      let current = this.subject.firstChild;

      while (current || stack.length > 0) {
        if (current) {
          yield current;
          if (current.nextSibling)
            stack.push(current.nextSibling);
          current = current.firstChild;
        } else {
          current = stack.pop();
        }
      }
    } else if (order === "breadth-first") {
      const queue: TreeNode<T>[] = [];
      let current = this.subject.firstChild;

      while (current) {
        queue.push(current);
        current = current.nextSibling;
      }

      while (queue.length > 0) {
        const node = queue.shift()!;
        yield node;

        let child = node.firstChild;
        while (child) {
          queue.push(child);
          child = child.nextSibling;
        }
      }
    }
  }
}
