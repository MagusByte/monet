export class GraphNode<T> {
  public parent: GraphNode<T> | undefined = undefined;
  public firstChild: GraphNode<T> | undefined = undefined;
  public lastChild: GraphNode<T> | undefined = undefined;
  public previousSibling: GraphNode<T> | undefined = undefined;
  public nextSibling: GraphNode<T> | undefined = undefined;

  constructor(public readonly value: T) { }
}

export function getChildren<T>(node: GraphNode<T>): GraphNode<T>[] {
  const children: GraphNode<T>[] = [];
  let current = node.firstChild;
  while (current) {
    children.push(current);
    current = current.nextSibling;
  }
  return children;
}

export function addChild<T>(
  parent: GraphNode<T>,
  newChild: GraphNode<T>,
  beforeChild?: GraphNode<T>
): void {
  if (newChild === parent || isAncestor(parent, newChild)) {
    throw new Error("Cannot add a node as a child of itself or its ancestor.");
  }

  if (newChild.parent === parent) {
    throw new Error("The newChild is already a child of this parent.");
  }

  if (beforeChild && beforeChild.parent !== parent) {
    throw new Error("The beforeChild is not a child of this parent.");
  }

  // Remove newChild from its current parent if it has one
  if (newChild.parent) {
    removeChild(newChild.parent, newChild);
  }

  newChild.parent = parent;

  if (!beforeChild) {
    // Add to the end
    if (!parent.lastChild) {
      parent.firstChild = parent.lastChild = newChild;
    } else {
      parent.lastChild.nextSibling = newChild;
      newChild.previousSibling = parent.lastChild;
      parent.lastChild = newChild;
    }
  } else {
    // Insert before beforeChild
    if (beforeChild.previousSibling) {
      beforeChild.previousSibling.nextSibling = newChild;
      newChild.previousSibling = beforeChild.previousSibling;
    } else {
      parent.firstChild = newChild;
    }
    newChild.nextSibling = beforeChild;
    beforeChild.previousSibling = newChild;
  }
}

function isAncestor<T>(node: GraphNode<T>, potentialAncestor: GraphNode<T>): boolean {
  let current = node.parent;
  while (current) {
    if (current === potentialAncestor) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

function removeChild<T>(parent: GraphNode<T>, child: GraphNode<T>): void {
  if (child.previousSibling) {
    child.previousSibling.nextSibling = child.nextSibling;
  } else {
    parent.firstChild = child.nextSibling;
  }

  if (child.nextSibling) {
    child.nextSibling.previousSibling = child.previousSibling;
  } else {
    parent.lastChild = child.previousSibling;
  }

  child.parent = undefined;
  child.previousSibling = undefined;
  child.nextSibling = undefined;
}
