import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { modify } from './modify';
import { query } from './query';

describe("query", () => {
  test("isParentOf returns true if the node is the parent of the given child", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    modify(parent).addChild(child);

    expect(query(parent).isParentOf(child)).toBe(true);
  });

  test("isParentOf returns false if the node is not the parent of the given child", () => {
    const parent = new TreeNode(1);
    const unrelated = new TreeNode(2);

    expect(query(parent).isParentOf(unrelated)).toBe(false);
  });

  test("isParentOf returns false if the child has no parent", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    expect(query(parent).isParentOf(child)).toBe(false);
  });
});
