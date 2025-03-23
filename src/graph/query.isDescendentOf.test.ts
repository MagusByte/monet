import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { modify } from './modify';
import { query } from './query';

describe("query", () => {
  test("isDescendentOf returns true if the node is a direct child of the given ancestor", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    modify(parent).addChild(child);

    expect(query(child).isDescendentOf(parent)).toBe(true);
  });

  test("isDescendentOf returns true if the node is an indirect descendent of the given ancestor", () => {
    const grandparent = new TreeNode(1);
    const parent = new TreeNode(2);
    const child = new TreeNode(3);

    modify(grandparent).addChild(parent);
    modify(parent).addChild(child);

    expect(query(child).isDescendentOf(grandparent)).toBe(true);
  });

  test("isDescendentOf returns true if the node is an indirect descendent of the given ancestor", () => {
    const grandparent = new TreeNode(1);
    const parent1 = new TreeNode(2);
    const parent2 = new TreeNode(3);
    const p1_c1 = new TreeNode(4);
    const p1_c2 = new TreeNode(5);
    const p2_c1 = new TreeNode(6);
    const p2_c2 = new TreeNode(7);

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
    const node1 = new TreeNode(1);
    const node2 = new TreeNode(2);

    expect(query(node1).isDescendentOf(node2)).toBe(false);
  });

  test("isDescendentOf returns false if the node is the same as the given ancestor", () => {
    const node = new TreeNode(1);

    expect(query(node).isDescendentOf(node)).toBe(false);
  });
});
