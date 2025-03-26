import { TreeNode } from './TreeNode';

/**
 * Interface representing a visitor for tree nodes.
 * This interface defines methods that can be implemented to perform
 * specific actions when visiting nodes in a tree structure.
 *
 * @template T - The type of data contained in the tree nodes.
 */
export interface ITreeNodeVisitor<T> {
  /**
   * Called when a tree node is visited.
   *
   * @param node - The tree node being visited.
   */
  onVisit(node: TreeNode<T>): void;

  /**
   * Optional method to determine whether a tree node can be entered.
   * If not implemented, all nodes are considered enterable by default.
   *
   * @param node - The tree node being evaluated.
   * @returns A boolean indicating whether the node can be entered.
   */
  canEnter?(node: TreeNode<T>): boolean;

  /**
   * Optional method called when entering a tree node.
   *
   * @param node - The tree node being entered.
   */
  onEnter?(node: TreeNode<T>): void;

  /**
   * Optional method called when leaving a tree node.
   *
   * @param node - The tree node being left.
   */
  onLeave?(node: TreeNode<T>): void;
}

/**
 * Traverses a tree structure in a depth-first manner, invoking the provided visitor
 * callbacks at various stages of the traversal.
 *
 * @template T - The type of the data contained in the tree nodes.
 * @param root - The root node of the tree to traverse.
 * @param visitor - An object containing callback functions to handle different
 * stages of the traversal:
 *   - `onVisit`: Called when a node is first visited.
 *   - `onEnter`: Called before visiting the children of a node (optional).
 *   - `onLeave`: Called after all children of a node have been visited (optional).
 *   - `canEnter`: A function to determine whether the traversal should enter
 *     the children of a node (optional, defaults to `true`).
 */
export function walkTree<T>(
  root: TreeNode<T>,
  visitor: ITreeNodeVisitor<T>
) {
  const stack: { node: TreeNode<T>; isLeaving: boolean }[] = [];
  stack.push({ node: root, isLeaving: false });

  while (stack.length > 0) {
    const { node, isLeaving } = stack.pop()!;

    if (isLeaving) {
      visitor.onLeave?.(node);
      continue;
    }

    visitor.onVisit(node);

    const canEnter = visitor.canEnter ? visitor.canEnter(node) : true;
    if (canEnter && node.firstChild) {
      visitor.onEnter?.(node);

      // Push the leave action for the current node
      stack.push({ node, isLeaving: true });

      // Push all children onto the stack in reverse order to maintain DFS
      let child: TreeNode<T> | undefined = node.firstChild;
      const children: TreeNode<T>[] = [];
      while (child) {
        children.push(child);
        child = child.nextSibling;
      }
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push({ node: children[i], isLeaving: false });
      }
    }
  }
}
