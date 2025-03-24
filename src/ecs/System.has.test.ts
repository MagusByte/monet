import { describe, test, expect, beforeEach } from "vitest";
import { System } from "./System";

describe("System.has", () => {
  let sut: System<string, number>;

  beforeEach(() => {
    sut = new System({
      create: () => "MockComponent"
    });
  });

  test("should return true for a registered entity", () => {
    sut.addTo(0);
    expect(sut.has(0)).toBe(true);
  });

  test("should return false for an unregistered entity", () => {
    expect(sut.has(0)).toBe(false);
  });
});
