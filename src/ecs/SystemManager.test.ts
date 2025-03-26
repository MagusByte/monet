import { beforeEach, describe, expect, test } from "vitest";
import { ISystem } from './ISystem';
import { SystemManager } from "./SystemManager";

describe("SystemManager", () => {
  let sut = new SystemManager<number>();
  beforeEach(() => sut = new SystemManager<number>());

  test("Initially has no systems", () => {
    expect(sut.getSystems()).toEqual([]);
  });

  describe("addSystem", () => {
    test("will store the system", () => {
      const system = {} as ISystem<number>;
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });

    test("will not store the same system twice", () => {
      const system = {} as ISystem<number>;
      sut.addSystem(system);
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });
  });

  describe("removeSystem", () => {
    test("will remove the system", () => {
      const system = {} as ISystem<number>;
      sut.addSystem(system);
      sut.removeSystem(system);
      expect(sut.getSystems()).toEqual([]);
    });

    test("will not throw when system was never added", () => {
      const system = {} as ISystem<number>;
      expect(() => sut.removeSystem(system)).not.toThrow();
    });
  });
});
