import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { modify } from './modify';
import { query } from './query';

describe("query", () => {
  test("isChildOf returns true if the node is a child of the given parent", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(query(child).isChildOf(parent)).toBe(true);
  });

  test("isChildOf returns false if the node is not a child of the given parent", () => {
    const parent = new GraphNode(1);
    const unrelated = new GraphNode(2);

    expect(query(unrelated).isChildOf(parent)).toBe(false);
  });

  test("isChildOf returns false if the relationship is reversed and the child is the parent", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(query(parent).isChildOf(child)).toBe(false);
  });

  test("isChildOf returns false if the node is a grandchild", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);
    const grandchild = new GraphNode(3);

    modify(parent).addChild(child);
    modify(child).addChild(grandchild);

    expect(query(grandchild).isChildOf(parent)).toBe(false);
  });
});
