import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { modify } from './modify';
import { query } from './query';

describe("query.getParent", () => {
  test("returns the parent of the node if it exists", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(query(child).getParent()).toBe(parent);
  });

  test("returns undefined if the node has no parent", () => {
    const node = new GraphNode(1);

    expect(query(node).getParent()).toBeUndefined();
  });
});
