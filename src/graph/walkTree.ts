import { TreeNode } from './TreeNode';

export interface ITreeNodeVisitor<T> {
  onVisit(node: TreeNode<T>): void;
  canEnter?(node: TreeNode<T>): boolean;
  onEnter?(node: TreeNode<T>): void;
  onLeave?(node: TreeNode<T>): void;
}

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
