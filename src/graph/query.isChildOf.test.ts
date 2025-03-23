import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { modify } from './modify';
import { query } from './query';

describe("query", () => {
  test("isChildOf returns true if the node is a child of the given parent", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    modify(parent).addChild(child);

    expect(query(child).isChildOf(parent)).toBe(true);
  });

  test("isChildOf returns false if the node is not a child of the given parent", () => {
    const parent = new TreeNode(1);
    const unrelated = new TreeNode(2);

    expect(query(unrelated).isChildOf(parent)).toBe(false);
  });

  test("isChildOf returns false if the relationship is reversed and the child is the parent", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    modify(parent).addChild(child);

    expect(query(parent).isChildOf(child)).toBe(false);
  });

  test("isChildOf returns false if the node is a grandchild", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);
    const grandchild = new TreeNode(3);

    modify(parent).addChild(child);
    modify(child).addChild(grandchild);

    expect(query(grandchild).isChildOf(parent)).toBe(false);
  });
});
