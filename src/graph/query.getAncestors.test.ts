import { describe, test, expect } from 'vitest';
import { GraphNode } from './GraphNode';
import { query } from './query';

describe("query.getAncestors", () => {
  test('getAncestors should yield all ancestors of the node in order', () => {
    const parent = new GraphNode('root');
    const child = new GraphNode('child1');
    const grandChild = new GraphNode('child2');

    child.parent = parent;
    grandChild.parent = child;

    const queryNode = query(grandChild);
    const ancestors = Array.from(queryNode.getAncestors());

    expect(ancestors).toEqual([child, parent]);
  });

  test('getAncestors should yield no ancestors if the node has no parent', () => {
    const root = new GraphNode('root');
    expect(Array.from(query(root).getAncestors())).toEqual([]);
  });
});
