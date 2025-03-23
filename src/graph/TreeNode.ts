/**
 * Represents a node in a tree structure, where each node can have a parent,
 * children, and sibling relationships.
 *
 * @template T The type of the value stored in the tree node.
 * 
 * @remarks
 * - This class provides a basic structure for tree nodes, including references to parent, child, and sibling nodes.
 * - Direct manipulation of the properties (e.g., `parent`, `firstChild`, etc.) is discouraged. 
 *   Instead, consider implementing and using `modify` and `query` methods to ensure the tree structure remains consistent.
 * 
 * @example
 * ```typescript
 * const root = new TreeNode<number>(1);
 * const child = new TreeNode<number>(2);
 * modify(parent).addChild(child); 
 * ```
 */
export class TreeNode<T> {
  /**
   * The parent node of this tree node. If this node is the root, the parent
   * will be `undefined`.
   */
  public parent: TreeNode<T> | undefined = undefined;

  /**
   * The first child node of this tree node. If this node has no children,
   * the value will be `undefined`.
   */
  public firstChild: TreeNode<T> | undefined = undefined;

  /**
   * The last child node of this tree node. If this node has no children,
   * the value will be `undefined`.
   */
  public lastChild: TreeNode<T> | undefined = undefined;

  /**
   * The previous sibling node of this tree node. If this node is the first
   * child of its parent, the value will be `undefined`.
   */
  public previousSibling: TreeNode<T> | undefined = undefined;

  /**
   * The next sibling node of this tree node. If this node is the last child
   * of its parent, the value will be `undefined`.
   */
  public nextSibling: TreeNode<T> | undefined = undefined;

  /**
   * Creates a new instance of `TreeNode`.
   *
   * @param value The value to store in this tree node.
   */
  constructor(public readonly value: T) { }
}
