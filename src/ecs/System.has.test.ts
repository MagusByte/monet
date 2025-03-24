import { describe, test, expect, beforeEach } from "vitest";
import { System } from "./System";
import { Entity } from "./Entity";

describe("System.has", () => {
  let sut: System<string>;

  beforeEach(() => {
    sut = new System({
      create: () => "MockComponent"
    });
  });

  test("should return true for a registered entity", () => {
    const entity = new Entity(1);
    sut.addTo(entity);
    expect(sut.has(entity)).toBe(true);
  });

  test("should return false for an unregistered entity", () => {
    const entity = new Entity(1);
    expect(sut.has(entity)).toBe(false);
  });
});
