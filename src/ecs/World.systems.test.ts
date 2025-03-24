import { beforeEach, describe, expect, test } from "vitest";
import { World } from './World';
import { SystemBase } from './SystemBase'; // Updated import

test("Can create a new world", () => {
  expect(() => new World()).not.toThrow();
});

describe("Systems", () => {
  let sut = new World();
  beforeEach(() => sut = new World());

  test("A new world has no systems", ()=>{
    expect(sut.getSystems()).toEqual([]);
  });

  describe("addSystem", ()=>{
    test("will add the system to the world", ()=>{
      const system: SystemBase = {} as SystemBase; // Updated type
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });

    test("will not add the same system twice to the world", () => { 
      const system: SystemBase = {} as SystemBase; // Updated type
      sut.addSystem(system);
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });
  });
  
  describe("removeSystem", ()=>{
    test("will remove the system from the world", ()=>{
      const system: SystemBase = {} as SystemBase; // Updated type
      sut.addSystem(system);
      sut.removeSystem(system);
      expect(sut.getSystems()).toEqual([]);
    });

    test("will not throw when system was never added to the world", () => {
      const system: SystemBase = {} as SystemBase; // Updated type
      expect(() => sut.removeSystem(system)).not.toThrow();
    });
  });
});
