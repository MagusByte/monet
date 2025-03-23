import { GraphNode } from './GraphNode';

export interface IQueryNode<T> {
  isAncestorOf(node: GraphNode<T>): boolean;
  getChildren(): Generator<GraphNode<T>>;
  isParentOf(child: GraphNode<T>): boolean;
  isChildOf(parent: GraphNode<T>): boolean;
  isDescendentOf(ancestor: GraphNode<T>): boolean; // Added method
}

export class QueryNode<T> implements IQueryNode<T> {
  private readonly subject: GraphNode<T>;

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

  isDescendentOf(ancestor: GraphNode<T>): boolean {
    let current = this.subject.parent;
    while (current) {
      if (current === ancestor) {
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
