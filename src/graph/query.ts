import { GraphNode } from './GraphNode';

export interface IQueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
  getChildren(): Generator<GraphNode<T>>;
}

export class QueryNode<T> implements IQueryNode<T> {
  private subject: GraphNode<T>;

  constructor(subject: GraphNode<T>) {
    this.subject = subject;
  }

  isAncestorOf(node: GraphNode<T>): boolean {
    let current = node.parent;
    while (current) {
      if (current === this.subject) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  *getChildren(): Generator<GraphNode<T>> {
    let current = this.subject.firstChild;
    while (current) {
      yield current;
      current = current.nextSibling;
    }
  }
}

export function query<T>(subject: GraphNode<T>): IQueryNode<T> {
  return new QueryNode(subject);
}
