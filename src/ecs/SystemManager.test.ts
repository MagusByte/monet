import { beforeEach, describe, expect, test } from "vitest";
import { ISystem, System } from './System';
import { IComponentFactory } from "./IComponentFactory";
import { SystemManager } from "./SystemManager";

describe("SystemManager", () => {
  let sut = new SystemManager();
  beforeEach(() => sut = new SystemManager());

  test("Initially has no systems", () => {
    expect(sut.getSystems()).toEqual([]);
  });

  describe("addSystem", () => {
    test("will store the system", () => {
      const system = {} as ISystem;
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });

    test("will not store the same system twice", () => {
      const system = {} as ISystem;
      sut.addSystem(system);
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });
  });

  describe("removeSystem", () => {
    test("will remove the system", () => {
      const system = new System({} as unknown as IComponentFactory<string>);
      sut.addSystem(system);
      sut.removeSystem(system);
      expect(sut.getSystems()).toEqual([]);
    });

    test("will not throw when system was never added", () => {
      const system = new System({} as unknown as IComponentFactory<string>);
      expect(() => sut.removeSystem(system)).not.toThrow();
    });
  });
});
