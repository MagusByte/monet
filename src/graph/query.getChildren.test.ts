import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { query } from './query';

describe("query.getChildren", () => {
  test("returns an empty generator for a node with no children", () => {
    const sut = new TreeNode(1);
    const result = Array.from(query(sut).getChildren());
    expect(result).toEqual([]);
  });

  test("yields all children in the correct order", () => {
    const parent = new TreeNode(1);
    const child1 = new TreeNode(2);
    const child2 = new TreeNode(3);
    const child3 = new TreeNode(3);

    parent.firstChild = child1;
    child1.nextSibling = child2;
    child2.nextSibling = child3;

    const result = Array.from(query(parent).getChildren());
    expect(result).toEqual([child1, child2, child3]);
  });
});
