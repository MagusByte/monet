import { describe, test, expect, beforeEach } from "vitest";
import { System } from "./System";

describe("System.getBy", () => {
  let sut: System<string, number>;

  beforeEach(() => {
    sut = new System({
      create: ()=> 'MockComponent'
    });
  });

  test("should return the associated component for a registered entity", () => {
    const component = sut.addTo(0);
    expect(sut.getBy(0)).toBe(component);
  });

  test("should return undefined for an unregistered entity", () => {
    expect(sut.getBy(0)).toBeUndefined();
  });
});
