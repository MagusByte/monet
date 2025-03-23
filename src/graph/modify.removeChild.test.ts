import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { modify } from './modify';

describe('ModifyNode.removeChild', () => {
  test('should remove first child correctly', () => {
    const parent = new GraphNode<string>('parent');
    const child1 = new GraphNode<string>('child1');
    const child2 = new GraphNode<string>('child2');

    const modifier = modify(parent);
    modifier.addChild(child1);
    modifier.addChild(child2);

    modifier.removeChild(child1);

    expect(parent.firstChild).toBe(child2);
    expect(parent.lastChild).toBe(child2);
    expect(child1.parent).toBeUndefined();
    expect(child1.previousSibling).toBeUndefined();
    expect(child1.nextSibling).toBeUndefined();
    expect(child2.previousSibling).toBeUndefined();
    expect(child2.nextSibling).toBeUndefined();
  });

  test('should remove last child correctly', () => {
    const parent = new GraphNode<string>('parent');
    const child1 = new GraphNode<string>('child1');
    const child2 = new GraphNode<string>('child2');

    const modifier = modify(parent);
    modifier.addChild(child1);
    modifier.addChild(child2);

    modifier.removeChild(child2);

    expect(parent.firstChild).toBe(child1);
    expect(parent.lastChild).toBe(child1);
    expect(child2.parent).toBeUndefined();
    expect(child2.previousSibling).toBeUndefined();
    expect(child2.nextSibling).toBeUndefined();
    expect(child1.previousSibling).toBeUndefined();
    expect(child1.nextSibling).toBeUndefined();
  });

  test('should remove a child node correctly (triplet)', () => {
    const parent = new GraphNode<string>('parent');
    const child1 = new GraphNode<string>('child1');
    const child2 = new GraphNode<string>('child2');
    const child3 = new GraphNode<string>('child3');

    const modifier = modify(parent);
    modifier.addChild(child1);
    modifier.addChild(child2);
    modifier.addChild(child3);

    modifier.removeChild(child2);

    expect(parent.firstChild).toBe(child1);
    expect(parent.lastChild).toBe(child3);
    expect(child2.parent).toBeUndefined();
    expect(child2.previousSibling).toBeUndefined();
    expect(child2.nextSibling).toBeUndefined();
    expect(child1.previousSibling).toBeUndefined();
    expect(child1.nextSibling).toBe(child3);
    expect(child3.previousSibling).toBe(child1);
    expect(child3.nextSibling).toBeUndefined();
  });

  test('should throw an error if the node is not a child', () => {
    const parent = new GraphNode<string>('parent');
    const unrelated = new GraphNode<string>('unrelated');

    const modifier = modify(parent);

    expect(() => modifier.removeChild(unrelated)).toThrowError(
      "The specified child is not a child of this node."
    );
  });
});
