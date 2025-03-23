import { describe, test, expect } from 'vitest';
import { GraphNode, getChildren } from './GraphNode';

describe("getChildren", () => {
  test("returns an empty array for a node with no children", () => {
    const sut = new GraphNode(1);
    expect(getChildren(sut)).toEqual([]);
  });

  test("returns all children in the correct order", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);

    parent.firstChild = child1;
    parent.lastChild = child2;
    child1.nextSibling = child2;
    child2.previousSibling = child1;

    expect(getChildren(parent)).toEqual([child1, child2]);
  });
});
