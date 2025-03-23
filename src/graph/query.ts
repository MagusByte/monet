import { GraphNode } from './GraphNode';

export interface IQueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
  getChildren(): Generator<GraphNode<T>>;
  isParentOf(child: GraphNode<T>): boolean;
  isChildOf(child: GraphNode<T>): boolean;
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

  isParentOf(child: GraphNode<T>): boolean {
    return child.parent === this.subject;
  }

  isChildOf(parent: GraphNode<T>): boolean {
    return this.subject.parent === parent;
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
