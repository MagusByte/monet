import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { query } from './query';

describe("query.getChildren", () => {
  test("returns an empty generator for a node with no children", () => {
    const sut = new GraphNode(1);
    const result = Array.from(query(sut).getChildren());
    expect(result).toEqual([]);
  });

  test("yields all children in the correct order", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);
    const child3 = new GraphNode(3);

    parent.firstChild = child1;
    child1.nextSibling = child2;
    child2.nextSibling = child3;

    const result = Array.from(query(parent).getChildren());
    expect(result).toEqual([child1, child2, child3]);
  });
});
