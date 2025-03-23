import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { modify } from './modify';

describe("modify.addChild", () => {
  test("adds a child at the end if beforeChild is undefined", () => {
    const parent = new GraphNode(1);
    const child1 = new GraphNode(2);
    const child2 = new GraphNode(3);

    modify(parent).addChild(child1);
    modify(parent).addChild(child2);

    expect(parent.firstChild).toBe(child1);
    expect(parent.lastChild).toBe(child2);
    expect(child1.nextSibling).toBe(child2);
    expect(child2.previousSibling).toBe(child1);
  });

  test("throws if newChild is the parent or an ancestor", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(() => modify(child).addChild(parent)).toThrow("Cannot add a node as a child of itself or its ancestor.");
  });

  test("throws if newChild is already a child of the parent", () => {
    const parent = new GraphNode(1);
    const child = new GraphNode(2);

    modify(parent).addChild(child);

    expect(() => modify(parent).addChild(child)).toThrow("The newChild already has a parent.");
  });

  test("throws if newChild already has a parent", () => {
    const parent1 = new GraphNode(1);
    const parent2 = new GraphNode(2);
    const child = new GraphNode(3);

    modify(parent1).addChild(child);

    expect(() => modify(parent2).addChild(child)).toThrow("The newChild already has a parent.");
  });
});
