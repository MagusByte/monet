import { GraphNode } from './GraphNode';

export interface QueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
  getChildren(): GraphNode<T>[];
}

export function query<T>(subject: GraphNode<T>): QueryNode<T> {
  return {
    isAncestorOf(node: GraphNode<T>): boolean {
      let current = node.parent;
      while (current) {
        if (current === subject) {
          return true;
        }
        current = current.parent;
      }
      return false;
    },
    getChildren(): GraphNode<T>[] {
      const children: GraphNode<T>[] = [];
      let current = subject.firstChild;
      while (current) {
        children.push(current);
        current = current.nextSibling;
      }
      return children;
    },
  };
}
