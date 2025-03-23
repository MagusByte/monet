import { GraphNode } from './GraphNode';

export interface QueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
  getChildren(): Generator<GraphNode<T>>;
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
    *getChildren(): Generator<GraphNode<T>> {
      let current = subject.firstChild;
      while (current) {
        yield current;
        current = current.nextSibling;
      }
    },
  };
}
