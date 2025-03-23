import { describe, test, expect } from 'vitest';
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
    expect(sut.firstChild).toBeUndefined();
    expect(sut.lastChild).toBeUndefined();
  });

  test("newly created GraphNode has no siblings", () => {
    const sut = new GraphNode(1);

    expect(sut.nextSibling).toBeUndefined();
    expect(sut.previousSibling).toBeUndefined();
  });
});
