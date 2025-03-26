import { describe, test, expect, beforeEach } from 'vitest';
import { TreeNode } from './TreeNode';
import { ITreeNodeVisitor, walkTree } from './walkTree';
import { modify } from './modify';

interface NodeVisitorCall<T> {
  method: keyof ITreeNodeVisitor<T>;
  value: T;
}

describe("walkTree", () => {
  let visitorCalls: NodeVisitorCall<string>[] = [];
  let simpleVisitor: ITreeNodeVisitor<string> = {
    onVisit: () => { }
  }

  function checkNodes(expected: NodeVisitorCall<string>[]) {
    expect(visitorCalls).toEqual(expected);
  }

  beforeEach(() => {
    visitorCalls = [];
    simpleVisitor = {
      onVisit: (node) => {
        visitorCalls.push({ method: 'onVisit', value: node.value });
      },
      onEnter: (node) => {
        visitorCalls.push({ method: 'onEnter', value: node.value });
      },
      onLeave: (node) => {
        visitorCalls.push({ method: 'onLeave', value: node.value });
      },
      canEnter: () => true
    };
  });

  test('should return the root node', () => {
    var root = new TreeNode("root");
    walkTree(root, simpleVisitor);
    checkNodes([
      { method: "onVisit", value: "root" }
    ]);
  });

  test('should traverse depth-first and call onEnter/onLeave', () => {
    var root = new TreeNode("root");
    var child1 = new TreeNode("child1");
    var child2 = new TreeNode("child2");
    root.firstChild = child1;
    child1.nextSibling = child2;

    walkTree(root, simpleVisitor);

    checkNodes([
      { method: "onVisit", value: "root" },
      { method: "onEnter", value: "root" },
      { method: "onVisit", value: "child1" },
      { method: "onVisit", value: "child2" },
      { method: "onLeave", value: "root" }
    ]);
  });

  test('should visit all', () => {
    var root = new TreeNode("root");
    var child1 = new TreeNode("child1");
    var child2 = new TreeNode("child2");
    root.firstChild = child1;
    child1.nextSibling = child2;

    walkTree(root, simpleVisitor);

    checkNodes([
      { method: "onVisit", value: "root" },
      { method: "onEnter", value: "root" },
      { method: "onVisit", value: "child1" },
      { method: "onVisit", value: "child2" },
      { method: "onLeave", value: "root" }
    ]);
  });

  test('should visit all children if canEnter is missing', () => {
    simpleVisitor.canEnter = undefined;

    var root = new TreeNode("root");
    var child1 = new TreeNode("child1");
    var child2 = new TreeNode("child2");
    root.firstChild = child1;
    child1.nextSibling = child2;

    walkTree(root, simpleVisitor);

    checkNodes([
      { method: "onVisit", value: "root" },
      { method: "onEnter", value: "root" },
      { method: "onVisit", value: "child1" },
      { method: "onVisit", value: "child2" },
      { method: "onLeave", value: "root" },
    ]);
  });

  describe("Complex", ()=>{
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
    beforeEach(() => {
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

    test("Visit all nodes", () => {
      walkTree(root,simpleVisitor);
      const expectedTraversalOrder: NodeVisitorCall<string>[] = [
        { value: root.value, method: "onVisit"},
        { value: root.value, method: "onEnter"},
        { value: p1.value, method: "onVisit"},
        { value: p1.value, method: "onEnter"},
        { value: p1_c1.value, method: "onVisit"},
        { value: p1_c1.value, method: "onEnter"},
        { value: p1_c1_g1.value, method: "onVisit"},
        { value: p1_c1_g2.value, method: "onVisit"},
        { value: p1_c1.value, method: "onLeave"},
        { value: p1_c2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onEnter"},
        { value: p1_c2_g1.value, method: "onVisit"},
        { value: p1_c2_g2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onLeave"},
        { value: p1.value, method: "onLeave"},
        { value: p2.value, method: "onVisit"},
        { value: p2.value, method: "onEnter"},
        { value: p2_c1.value, method: "onVisit"},
        { value: p2_c1.value, method: "onEnter"},
        { value: p2_c1_g1.value, method: "onVisit"},
        { value: p2_c1_g2.value, method: "onVisit"},
        { value: p2_c1.value, method: "onLeave"},
        { value: p2_c2.value, method: "onVisit"},
        { value: p2.value, method: "onLeave"},
        { value: root.value, method: "onLeave"},
      ];
  
      expect(visitorCalls).toEqual(expectedTraversalOrder);
    });

    test("Ignore a single branch", () => {
      simpleVisitor.canEnter = (n)=> n != p2;
      walkTree(root,simpleVisitor);
      const expectedTraversalOrder: NodeVisitorCall<string>[] = [
        { value: root.value, method: "onVisit"},
        { value: root.value, method: "onEnter"},
        { value: p1.value, method: "onVisit"},
        { value: p1.value, method: "onEnter"},
        { value: p1_c1.value, method: "onVisit"},
        { value: p1_c1.value, method: "onEnter"},
        { value: p1_c1_g1.value, method: "onVisit"},
        { value: p1_c1_g2.value, method: "onVisit"},
        { value: p1_c1.value, method: "onLeave"},
        { value: p1_c2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onEnter"},
        { value: p1_c2_g1.value, method: "onVisit"},
        { value: p1_c2_g2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onLeave"},
        { value: p1.value, method: "onLeave"},
        { value: p2.value, method: "onVisit"},
        { value: root.value, method: "onLeave"},
      ];
  
      expect(visitorCalls).toEqual(expectedTraversalOrder);
    });

    test("Grab a subtree", () => {
      walkTree(p1,simpleVisitor);
      const expectedTraversalOrder: NodeVisitorCall<string>[] = [
        { value: p1.value, method: "onVisit"},
        { value: p1.value, method: "onEnter"},
        { value: p1_c1.value, method: "onVisit"},
        { value: p1_c1.value, method: "onEnter"},
        { value: p1_c1_g1.value, method: "onVisit"},
        { value: p1_c1_g2.value, method: "onVisit"},
        { value: p1_c1.value, method: "onLeave"},
        { value: p1_c2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onEnter"},
        { value: p1_c2_g1.value, method: "onVisit"},
        { value: p1_c2_g2.value, method: "onVisit"},
        { value: p1_c2.value, method: "onLeave"},
        { value: p1.value, method: "onLeave"},
      ];
  
      expect(visitorCalls).toEqual(expectedTraversalOrder);
    });
  });
});
