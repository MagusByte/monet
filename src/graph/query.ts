import { GraphNode } from '../ecs/GraphNode';

export interface QueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
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
  };
}
