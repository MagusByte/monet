import { beforeEach, expect, test, vi, MockInstance, describe } from "vitest"
import { type ChildrenVisitor, visitChildren } from './visit-children';
import { OldEntity } from "../OldEntity";

let visitor: ChildrenVisitor;
let onVisitSpy: MockInstance;
beforeEach(() => {
  visitor = {
    onVisit() { },
  };
  onVisitSpy = vi.spyOn(visitor, "onVisit");
});

test("visitor.onVisit will not be called unless there are elements", () => {
  const entities: OldEntity[] = [];
  visitChildren(entities, visitor);
  expect(onVisitSpy).not.toHaveBeenCalled();
});

test("visitor.onVisit is called for each entity in initial array", () => {
  const entities: OldEntity[] = [new OldEntity(), new OldEntity()];
  visitChildren(entities, visitor);
  expect(onVisitSpy).toHaveBeenCalledTimes(2);
  expect(onVisitSpy).toHaveBeenCalledWith(entities[0]);
  expect(onVisitSpy).toHaveBeenCalledWith(entities[1]);
});

test("visitor is called for each entity in the graph", () => {
  // Arrange
  const parent = new OldEntity();
  const child = new OldEntity();
  const grandchild = new OldEntity();
  child.setParent(parent);
  grandchild.setParent(child);

  // Act
  visitChildren([parent], visitor);

  // Assert
  expect(onVisitSpy).toHaveBeenCalledTimes(3);
  expect(onVisitSpy).toHaveBeenCalledWith(parent);
  expect(onVisitSpy).toHaveBeenCalledWith(child);
  expect(onVisitSpy).toHaveBeenCalledWith(grandchild);
});

test("visitor.canEnter determines if children can be visited", () => {
  // Arrange
  const parent = new OldEntity();
  const child1 = new OldEntity();
  const child2 = new OldEntity();
  const grandchild = new OldEntity();

  child1.setParent(parent);
  child2.setParent(parent);
  grandchild.setParent(child1);

  // Only the parent can be entered.
  visitor.canEnter = (e) => e == parent;

  // Act
  visitChildren([parent], visitor);

  // Assert
  expect(onVisitSpy).toHaveBeenCalledTimes(3);
  expect(onVisitSpy).toHaveBeenCalledWith(parent);
  expect(onVisitSpy).toHaveBeenCalledWith(child1);
  expect(onVisitSpy).toHaveBeenCalledWith(child2);
  expect(onVisitSpy).not.toHaveBeenCalledWith(grandchild);
});

test("visitor.onEnter is only called for those it can enter", () => {
  // Arrange
  const parent = new OldEntity();
  const child1 = new OldEntity();
  const child2 = new OldEntity();
  const grandchild = new OldEntity();

  child1.setParent(parent);
  child2.setParent(parent);
  grandchild.setParent(child1);

  // Only the parent can be entered.
  visitor.canEnter = (e) => e == parent;
  const onEnterFake = vi.fn(() => { })
  visitor.onEnter = onEnterFake;

  // Act
  visitChildren([parent], visitor);

  // Assert
  expect(onEnterFake).toHaveBeenCalledTimes(1);
  expect(onEnterFake).toHaveBeenCalledWith(parent);
});


test("visitor.onLeave is only called for those it can enter", () => {
  // Arrange
  const parent = new OldEntity("parent");
  const child1 = new OldEntity("child1");
  const child2 = new OldEntity("child2");
  const grandchild = new OldEntity("grandchild");

  child1.setParent(parent);
  child2.setParent(parent);
  grandchild.setParent(child1);

  // Only the parent can be entered.
  visitor.canEnter = (e) => e == parent;
  const onLeaveFake = vi.fn(() => { }).mockName("onLeave");
  const onEnterFake = vi.fn(() => { }).mockName("onEnter");
  visitor.onEnter = onEnterFake;
  visitor.onLeave = onLeaveFake;

  // Act
  visitChildren([parent], visitor);

  // Assert
  expect(onEnterFake).toHaveBeenCalledExactlyOnceWith(parent);
  expect(onLeaveFake).toHaveBeenCalledExactlyOnceWith(parent);
});

test("visitor.onEnter is only called if the entity has children", () => {
  // Arrange
  const parent = new OldEntity();
  // Only the parent can be entered.
  visitor.canEnter = () => true;
  const onEnterFake = vi.fn(() => { })
  visitor.onEnter = onEnterFake;

  // Act
  visitChildren([parent], visitor);

  // Assert
  expect(onEnterFake).toHaveBeenCalledTimes(0);
});

describe("Checking call order", () => {
  let parent = new OldEntity();
  let friend = new OldEntity();
  let child1 = new OldEntity();
  let child2 = new OldEntity();
  let grandchild = new OldEntity();
  let callOrders: { entity: OldEntity, operation: (keyof ChildrenVisitor) }[] = [];
  beforeEach(() => {
    // Arrange
    parent = new OldEntity();
    friend = new OldEntity();
    child1 = new OldEntity();
    child2 = new OldEntity();
    grandchild = new OldEntity();

    child1.setParent(parent);
    child2.setParent(parent);
    grandchild.setParent(child1);

    callOrders = [];

    visitor.onEnter = (entity) => callOrders.push({ entity, operation: "onEnter" });
    visitor.onLeave = (entity) => callOrders.push({ entity, operation: "onLeave" });
    visitor.onVisit = (entity) => callOrders.push({ entity, operation: "onVisit" });
    visitor.canEnter = (entity) => { callOrders.push({ entity, operation: "canEnter" }); return true };

    // Act
    visitChildren([parent, friend], visitor);
  });

  test("Parent-only check", () => {
    // Assert
    const parentCallOrders = callOrders.filter(x => x.entity == parent);
    expect(parentCallOrders.map(x => x.operation)).toEqual(["onVisit", "canEnter", "onEnter", "onLeave"]);
  });

  test("Friend-only check", () => {
    const friendCallOrders = callOrders.filter(x => x.entity == friend);
    expect(friendCallOrders.map(x => x.operation)).toEqual(["onVisit"]);
  });

  test("Visit should be done depth first", ()=>{
    const parentIndex = callOrders.filter(x => x.operation == 'onVisit').findIndex(x => x.entity == parent);
    const child1Index = callOrders.filter(x => x.operation == 'onVisit').findIndex(x => x.entity == child1);
    const child2Index = callOrders.filter(x => x.operation == 'onVisit').findIndex(x => x.entity == child2);
    const grandChildIndex = callOrders.filter(x => x.operation == 'onVisit').findIndex(x => x.entity == grandchild);
    const friendIndex = callOrders.filter(x => x.operation == 'onVisit').findIndex(x => x.entity == friend);

    expect(parentIndex, "parent").toBeLessThan(child1Index);
    expect(child1Index, "child1").toBeLessThan(child2Index);
    expect(grandChildIndex, "grandchild").toBeLessThan(child2Index);
    expect(child2Index, "child2").toBeLessThan(friendIndex);
  });
});
