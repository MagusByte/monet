import { beforeEach, expect, test, vi } from "vitest"
import { walkBubble, type BubbleVisitor } from './walk-bubble';
import { Entity } from "../Entity";

type VisitCall = { method: keyof BubbleVisitor, entity: Entity };
type SimpleVisitCall = { method: keyof BubbleVisitor, name?: string };

let callOrder: VisitCall[] = [];
let visitor: BubbleVisitor = {
  onVisit: vi.fn((entity) => {
    callOrder.push({ method: "onVisit", entity })
    return true;
  }),
};
function getSimpleCallLog() {
  return toSimpleCallLog(callOrder);
}

function toSimpleCallLog(log: VisitCall[]) {
  return log.map((x): SimpleVisitCall => ({ method: x.method, name: x.entity.name }));
}

function createEntity(name?: string, parent?: Entity) {
  const entity = new Entity(name);
  entity.setParent(parent);
  return entity;
}

beforeEach(() => {
  callOrder = [];
  visitor = {
    onVisit: vi.fn((entity) => {
      callOrder.push({ method: "onVisit", entity })
      return true;
    }),
  };
});

test("should only invoke the visit method once if no call order", () => {
  const entity = createEntity();
  walkBubble(entity, visitor);
  expect(visitor.onVisit).toHaveBeenCalledOnce();
});

test("should visit each and every parent", () => {
  const grandparent = createEntity("grandparent");
  const parent = createEntity("parent", grandparent);
  const child = createEntity("child", parent);
  const grandchild = createEntity("grandchild", child);

  walkBubble(grandchild, visitor);

  expect(getSimpleCallLog()).toEqual([
    { method: "onVisit", name: "grandchild" },
    { method: "onVisit", name: "child" },
    { method: "onVisit", name: "parent" },
    { method: "onVisit", name: "grandparent" },
  ]);
});

test("should visit each and every parent until visitor says stop", ()=>{
  const grandparent = createEntity("grandparent");
  const parent = createEntity("parent", grandparent);
  const child = createEntity("child", parent);
  const grandchild = createEntity("grandchild", child);

  visitor = {
    onVisit: vi.fn((entity) => {
      callOrder.push({ method: "onVisit", entity })
      return entity != parent;
    }),
  };

  walkBubble(grandchild, visitor);

  expect(getSimpleCallLog()).toEqual([
    { method: "onVisit", name: "grandchild" },
    { method: "onVisit", name: "child" },
    { method: "onVisit", name: "parent" },
  ]);
});

test("should not visit neighbours", ()=>{
  const g1 = createEntity("g1");
  const g1_p1 = createEntity("g1_p1", g1);
  const g1_p2 = createEntity("g1_p2", g1); 
  const g1_p1_c1 = createEntity("g1_p1_c1", g1_p1);
  const g1_p1_c2 = createEntity("g1_p1_c2", g1_p1); 
  const g1_p1_c1_gc1 = createEntity("g1_p1_c1_gc1", g1_p1_c1);
  const g1_p1_c1_gc2 = createEntity("g1_p1_c1_gc2", g1_p1_c1); 

  walkBubble(g1_p1_c1_gc1, visitor);

  expect(getSimpleCallLog()).toEqual([
    { method: "onVisit", name: "g1_p1_c1_gc1" },
    { method: "onVisit", name: "g1_p1_c1" },
    { method: "onVisit", name: "g1_p1" },
    { method: "onVisit", name: "g1" },
  ]);
});

test("should not children", ()=>{
  const grandparent = createEntity("grandparent");
  const parent = createEntity("parent", grandparent);
  const child = createEntity("child", parent);
  const grandchild = createEntity("grandchild", child);

  walkBubble(parent, visitor);

  expect(getSimpleCallLog()).toEqual([
    { method: "onVisit", name: "parent" },
    { method: "onVisit", name: "grandparent" },
  ]);
});
