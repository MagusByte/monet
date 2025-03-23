import { describe, test, vi, expect } from 'vitest';
import { GraphNode, getChildren, addChild } from './GraphNode';

describe("GraphNode", () => {
  test("value is set by constructor", () => {
    const sut = new GraphNode(1);
    expect(sut.value).toBe(1);
  });

  test("newly created GraphNode has no parent", () => {
    const sut = new GraphNode(1);
    expect(sut.parent).toBeUndefined();
  });

  test("newly created GraphNode has no children", () => {
    const sut = new GraphNode(1);
    expect(getChildren(sut)).toEqual([]);
    expect(sut.firstChild).toBeUndefined();
    expect(sut.lastChild).toBeUndefined();
  });

  test("linked list structure is maintained", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);

    // Simulate adding children
    parent.firstChild = child1;
    parent.lastChild = child2;
    child1.nextSibling = child2;
    child2.previousSibling = child1;

    expect(parent.firstChild).toBe(child1);
    expect(parent.lastChild).toBe(child2);
    expect(child1.nextSibling).toBe(child2);
    expect(child2.previousSibling).toBe(child1);
    expect(getChildren(parent)).toEqual([child1, child2]);
  });

  test("addChild adds a child at the end if beforeChild is undefined", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);

    addChild(parent, child1);
    addChild(parent, child2);

    expect(getChildren(parent)).toEqual([child1, child2]);
    expect(parent.firstChild).toBe(child1);
    expect(parent.lastChild).toBe(child2);
    expect(child1.nextSibling).toBe(child2);
    expect(child2.previousSibling).toBe(child1);
  });

  test("addChild inserts a child before the specified beforeChild", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);
    const child3 = new GraphNode(4);

    addChild(parent, child1);
    addChild(parent, child2);
    addChild(parent, child3, child2);

    expect(getChildren(parent)).toEqual([child1, child3, child2]);
    expect(child1.nextSibling).toBe(child3);
    expect(child3.previousSibling).toBe(child1);
    expect(child3.nextSibling).toBe(child2);
    expect(child2.previousSibling).toBe(child3);
  });

  test("addChild throws if newChild is the parent or an ancestor", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    addChild(parent, child);

    expect(() => addChild(child, parent)).toThrow("Cannot add a node as a child of itself or its ancestor.");
  });

  test("addChild throws if beforeChild is not a child of the parent", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);
    const unrelated = new GraphNode(3);

    expect(() => addChild(parent, child, unrelated)).toThrow("The beforeChild is not a child of this parent.");
  });

  test("addChild throws if newChild is already a child of the parent", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    addChild(parent, child);

    expect(() => addChild(parent, child)).toThrow("The newChild is already a child of this parent.");
  });
});
