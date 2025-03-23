import { describe, test, vi, expect } from 'vitest';
import { GraphNode } from './GraphNode';

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
    expect(sut.getChildren()).toEqual([]);
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
    expect(parent.getChildren()).toEqual([child1, child2]);
  });
});
