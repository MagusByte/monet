import { describe, test, expect } from 'vitest';
import { GraphNode, isAncestor } from './GraphNode';

describe("isAncestor", () => {
  test("returns false if providing self", () => {
    const sut = new GraphNode(1);
    expect(isAncestor(sut, sut)).toBe(false);
  });

  test("returns false if unrelated", () => {
    const sut1 = new GraphNode(1);
    const sut2 = new GraphNode(2);
    expect(isAncestor(sut1, sut2)).toBe(false);
  });

  test("returns true if second node is parent", () => {
    const child = new GraphNode(1);
    const parent = new GraphNode(2);
    child.parent = parent;
    parent.firstChild = child;
    expect(isAncestor(child, parent)).toBe(true);
  });

  test("returns false if second node is child", () => {
    const child = new GraphNode(1);
    const parent = new GraphNode(2);
    child.parent = parent;
    parent.firstChild = child;
    expect(isAncestor(parent, child)).toBe(false);
  });

  test("returns true if second node is grandchild", () => {
    const grandchild = new GraphNode(1);
    const child = new GraphNode(2);
    const parent = new GraphNode(3);
    grandchild.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild;
    expect(isAncestor(grandchild, parent)).toBe(true);
  });

  test("returns false if second node is grandchild", () => {
    const grandchild = new GraphNode(1);
    const child = new GraphNode(2);
    const parent = new GraphNode(3);
    grandchild.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild;
    expect(isAncestor(parent, grandchild)).toBe(false);
  });

  test("returns true if second node is grandchild2", () => {
    const grandchild1 = new GraphNode(1);
    const grandchild2 = new GraphNode(2);
    const child = new GraphNode(3);
    const parent = new GraphNode(4);
 
    grandchild1.parent = child;
    grandchild2.parent = child;
    child.parent = parent;
    parent.firstChild = child;
    child.firstChild = grandchild1;

    grandchild1.nextSibling = grandchild2;

    expect(isAncestor(grandchild2, parent)).toBe(true);
  });

});
