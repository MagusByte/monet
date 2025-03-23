import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';

describe("TreeNode", () => {
  test("value is set by constructor", () => {
    const sut = new TreeNode(1);
    expect(sut.value).toBe(1);
  });

  test("newly created TreeNode has no parent", () => {
    const sut = new TreeNode(1);
    expect(sut.parent).toBeUndefined();
  });

  test("newly created TreeNode has no children", () => {
    const sut = new TreeNode(1);
    expect(sut.firstChild).toBeUndefined();
    expect(sut.lastChild).toBeUndefined();
  });

  test("newly created TreeNode has no siblings", () => {
    const sut = new TreeNode(1);

    expect(sut.nextSibling).toBeUndefined();
    expect(sut.previousSibling).toBeUndefined();
  });
});
