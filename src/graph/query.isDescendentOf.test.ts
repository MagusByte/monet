import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { modify } from './modify';
import { query } from './query';

describe("query", () => {
  test("isDescendentOf returns true if the node is a direct child of the given ancestor", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(query(child).isDescendentOf(parent)).toBe(true);
  });

  test("isDescendentOf returns true if the node is an indirect descendent of the given ancestor", () => {
    const grandparent = new GraphNode(1);
    const parent = new GraphNode(2);
    const child = new GraphNode(3);

    modify(grandparent).addChild(parent);
    modify(parent).addChild(child);

    expect(query(child).isDescendentOf(grandparent)).toBe(true);
  });

  test("isDescendentOf returns true if the node is an indirect descendent of the given ancestor", () => {
    const grandparent = new GraphNode(1);
    const parent1 = new GraphNode(2);
    const parent2 = new GraphNode(3);
    const p1_c1 = new GraphNode(4);
    const p1_c2 = new GraphNode(5);
    const p2_c1 = new GraphNode(6);
    const p2_c2 = new GraphNode(7);

    modify(grandparent).addChild(parent1);
    modify(grandparent).addChild(parent2);
    modify(parent1).addChild(p1_c1);
    modify(parent1).addChild(p1_c2);

    modify(parent2).addChild(p2_c1);
    modify(parent2).addChild(p2_c2);

    expect(query(p1_c1).isDescendentOf(grandparent)).toBe(true);
    expect(query(p1_c2).isDescendentOf(grandparent)).toBe(true);
    expect(query(p2_c1).isDescendentOf(grandparent)).toBe(true);
    expect(query(p2_c2).isDescendentOf(grandparent)).toBe(true);
  });

  test("isDescendentOf returns false if the node is not a descendent of the given ancestor", () => {
    const node1 = new GraphNode(1);
    const node2 = new GraphNode(2);

    expect(query(node1).isDescendentOf(node2)).toBe(false);
  });

  test("isDescendentOf returns false if the node is the same as the given ancestor", () => {
    const node = new GraphNode(1);

    expect(query(node).isDescendentOf(node)).toBe(false);
  });
});
