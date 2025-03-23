import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { modify } from './modify';
import { query } from './query';

describe("query.getParent", () => {
  test("returns the parent of the node if it exists", () => {
    const parent = new TreeNode(1);
    const child = new TreeNode(2);

    modify(parent).addChild(child);

    expect(query(child).getParent()).toBe(parent);
  });

  test("returns undefined if the node has no parent", () => {
    const node = new TreeNode(1);

    expect(query(node).getParent()).toBeUndefined();
  });
});
