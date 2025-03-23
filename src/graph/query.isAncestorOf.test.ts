import { describe, test, expect } from 'vitest';
import { TreeNode } from './TreeNode';
import { query } from './query';

describe("query.isAncestorOf", () => {
  test("returns false if providing self", () => {
    const sut = new TreeNode(1);
    expect(query(sut).isAncestorOf(sut)).toBe(false);
  });

  test("returns false if unrelated", () => {
    const sut1 = new TreeNode(1);
    const sut2 = new TreeNode(2);
    expect(query(sut1).isAncestorOf(sut2)).toBe(false);
  });

  test("returns true if second node is parent", () => {
    const child = new TreeNode(1);
    const parent = new TreeNode(2);
    child.parent = parent;
    parent.firstChild = child;
    expect(query(parent).isAncestorOf(child)).toBe(true);
  });

  test("returns false if second node is child", () => {
    const child = new TreeNode(1);
    const parent = new TreeNode(2);
    child.parent = parent;
    parent.firstChild = child;
    expect(query(child).isAncestorOf(parent)).toBe(false);
  });

  test("returns true if second node is grandparent", () => {
    const grandchild = new TreeNode(1);
    const child = new TreeNode(2);
    const parent = new TreeNode(3);
    grandchild.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild;
    expect(query(parent).isAncestorOf(grandchild)).toBe(true);
  });

  test("returns false if second node is grandchild", () => {
    const grandchild = new TreeNode(1);
    const child = new TreeNode(2);
    const parent = new TreeNode(3);
    grandchild.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild;
    expect(query(grandchild).isAncestorOf(parent)).toBe(false);
  });

  test("returns true if second node is grandparent with siblings", () => {
    const grandchild1 = new TreeNode(1);
    const grandchild2 = new TreeNode(2);
    const child = new TreeNode(3);
    const parent = new TreeNode(4);

    grandchild1.parent = child;
    grandchild2.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild1
    grandchild1.nextSibling = grandchild2;

    expect(query(parent).isAncestorOf(grandchild2)).toBe(true);
  });
});
