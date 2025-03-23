import { describe, test, expect, beforeEach } from 'vitest';
import { TreeNode } from './TreeNode';
import { modify } from './modify';
import { query } from './query';

describe("query.getDescendents", () => {
  test("returns no descendents for a node with no children", () => {
    const node = new TreeNode("root");
    const result = Array.from(query(node).getDescendents()).map(node => node.value);
    expect(result).toEqual([]);
  });

  test("returns all descendents in depth-first order by default", () => {
    const root = new TreeNode("root");
    const c1 = new TreeNode("c1");
    const c2 = new TreeNode("c2");
    const g1_c1 = new TreeNode("c1_g1");
    const g2_c1 = new TreeNode("c2_g1");

    modify(root).addChild(c1);
    modify(root).addChild(c2);
    modify(c1).addChild(g1_c1);
    modify(c2).addChild(g2_c1);

    const result = Array.from(query(root).getDescendents()).map(node => node.value);
    expect(result).toEqual(["c1", "c1_g1", "c2", "c2_g1"]);
  });

  test("returns all descendents in depth-first order by default (unbalanced)", () => {
    const root = new TreeNode("root");
    const c1 = new TreeNode("c1");
    const c2 = new TreeNode("c2");
    const c1_g1 = new TreeNode("c1_g1");
    const c1_g2 = new TreeNode("c1_g2");
    const c2_g1 = new TreeNode("c2_g1");

    modify(root).addChild(c1);
    modify(root).addChild(c2);
    modify(c1).addChild(c1_g1);
    modify(c1).addChild(c1_g2);
    modify(c2).addChild(c2_g1);

    const result = Array.from(query(root).getDescendents()).map(node => node.value);
    expect(result).toEqual(["c1", "c1_g1", "c1_g2", "c2", "c2_g1"]);
  });

  describe("complex", ()=>{
    let root = new TreeNode("root");
    let p1 = new TreeNode("p1");
    let p2 = new TreeNode("p2");
    let p1_c1 = new TreeNode("p1_c1");
    let p1_c1_g1 = new TreeNode("p1_c1_g1");
    let p1_c1_g2 = new TreeNode("p1_c1_g2");
    let p1_c2 = new TreeNode("p1_c2");
    let p1_c2_g1 = new TreeNode("p1_c2_g1");
    let p1_c2_g2 = new TreeNode("p1_c2_g2");
    let p2_c1 = new TreeNode("p2_c1");
    let p2_c1_g1 = new TreeNode("p2_c1_g1");
    let p2_c1_g2 = new TreeNode("p2_c1_g2");
    let p2_c2 = new TreeNode("p2_c2");

    beforeEach(()=>{
      root = new TreeNode("root");
      p1 = new TreeNode("p1");
      p2 = new TreeNode("p2");

      // Root ahs no attach
      modify(root).addChild(p1);
      modify(root).addChild(p2);

      p1_c1 = new TreeNode("p1_c1");
      p1_c1_g1 = new TreeNode("p1_c1_g1");
      p1_c1_g2 = new TreeNode("p1_c1_g2");

      modify(p1).addChild(p1_c1);
      modify(p1_c1).addChild(p1_c1_g1);
      modify(p1_c1).addChild(p1_c1_g2);
      p1_c2 = new TreeNode("p1_c2");
      p1_c2_g1 = new TreeNode("p1_c2_g1");
      p1_c2_g2 = new TreeNode("p1_c2_g2");

      modify(p1).addChild(p1_c2);
      modify(p1_c2).addChild(p1_c2_g1);
      modify(p1_c2).addChild(p1_c2_g2);

      p2_c1 = new TreeNode("p2_c1");
      p2_c1_g1 = new TreeNode("p2_c1_g1");
      p2_c1_g2 = new TreeNode("p2_c1_g2");

      modify(p2).addChild(p2_c1);
      modify(p2_c1).addChild(p2_c1_g1);
      modify(p2_c1).addChild(p2_c1_g2);

      p2_c2 = new TreeNode("p2_c2");
      modify(p2).addChild(p2_c2);
    });

    test("returns all descendents in depth-first order by default (unbalanced, with more nodes)", () => {
      const result = Array.from(query(root).getDescendents("depth-first")).map(node => node.value);
      const expectedNodeOrder = [
        p1,
        p1_c1,
        p1_c1_g1,
        p1_c1_g2,
        p1_c2,
        p1_c2_g1,
        p1_c2_g2,
        p2,
        p2_c1,
        p2_c1_g1,
        p2_c1_g2,
        p2_c2
      ];
  
      expect(result).toEqual(expectedNodeOrder.map(x => x.value));
    });

    test("returns all descendents in breadth-first order by default (unbalanced, with more nodes)", () => {
      const result = Array.from(query(root).getDescendents("breadth-first")).map(node => node.value);
      const expectedNodeOrder = [
        p1,
        p2,
        p1_c1,
        p1_c2,
        p2_c1,
        p2_c2,
        p1_c1_g1,
        p1_c1_g2,
        p1_c2_g1,
        p1_c2_g2,
        p2_c1_g1,
        p2_c1_g2,
      ];
  
      expect(result).toEqual(expectedNodeOrder.map(x => x.value));
    });
  });
});
