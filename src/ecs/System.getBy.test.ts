import { describe, test, expect, beforeEach } from "vitest";
import { System } from "./System";
import { Entity } from "./Entity";
import { IComponentFactory } from "./IComponentFactory";

class MockComponentFactory implements IComponentFactory<string> {
  create() {
    return "MockComponent";
  }
  destroy(component: string) { }
}

describe("System.getBy", () => {
  let sut: System<string>;

  beforeEach(() => {
    sut = new System(new MockComponentFactory());
  });

  test("should return the associated component for a registered entity", () => {
    const entity = new Entity(1);
    const component = sut.addTo(entity);
    expect(sut.getBy(entity)).toBe(component);
  });

  test("should return undefined for an unregistered entity", () => {
    const entity = new Entity(1);
    expect(sut.getBy(entity)).toBeUndefined();
  });
});
