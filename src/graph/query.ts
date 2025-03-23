import { GraphNode } from './GraphNode';

export interface IQueryNode<T> {
  isParentOf(child: GraphNode<T>): boolean;
  isAncestorOf(descendent: GraphNode<T>): boolean;

  isChildOf(parent: GraphNode<T>): boolean;
  isDescendentOf(ancestor: GraphNode<T>): boolean; // Added method

  getChildren(): Generator<GraphNode<T>>;
  getAncestors(): Generator<GraphNode<T>>;
  getParent(): GraphNode<T> | undefined;
  getDescendents(order?: "breadth-first" | "depth-first"): Generator<GraphNode<T>>;
}

export class QueryNode<T> implements IQueryNode<T> {
  private readonly subject: GraphNode<T>;

  constructor(subject: GraphNode<T>) {
    this.subject = subject;
  }

  isAncestorOf(descendent: GraphNode<T>): boolean {
    let current = descendent.parent;
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

  *getAncestors(): Generator<GraphNode<T>> {
    let current = this.subject.parent;
    while (current) {
      yield current;
      current = current.parent;
    }
  }

  getParent(): GraphNode<T> | undefined {
    return this.subject.parent;
  }

  *getDescendents(order: "breadth-first" | "depth-first" = "depth-first"): Generator<GraphNode<T>> {
    if (order === "depth-first") {
      const stack: GraphNode<T>[] = [];
      let current = this.subject.firstChild;

      while (current || stack.length > 0) {
        if (current) {
          yield current;
          stack.push(current.nextSibling);
          current = current.firstChild;
        } else {
          current = stack.pop() || undefined;
        }
      }
    } else if (order === "breadth-first") {
      const queue: GraphNode<T>[] = [];
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

export function query<T>(subject: GraphNode<T>): IQueryNode<T> {
  return new QueryNode(subject);
}
