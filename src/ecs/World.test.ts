import { beforeEach, describe, expect, test } from "vitest";
import { World, Entity, ISystem } from './World';

test("Can create a new world", () => {
  expect(() => new World()).not.toThrow();
});

describe("entities", () => {
  test("A new world has no entities", () => {
    const sut = new World();
    expect(sut.getEntities()).toEqual([]);
  });

  describe("createEntity()", () => {
    let sut = new World();
    beforeEach(() => sut = new World());

    test("will return a new entity", () => {
      const entity = sut.createEntity();
      expect(entity).toBeInstanceOf(Entity);
    });

    test("will add entity to the world", () => {
      const entity = sut.createEntity();
      expect(sut.getEntities()).toEqual([entity]);
    });

    test('new entity should have different keys', () => {
      const e1 = sut.createEntity();
      const e2 = sut.createEntity();
      expect(e1.key).not.toBe(e2.key);
    });
  });

  describe("destroyEntity()", () => {
    let sut = new World();
    beforeEach(() => sut = new World());

    test("will remove the entity from the world", () => {
      const entity = sut.createEntity();
      sut.destroyEntity(entity);
      expect(sut.getEntities()).toEqual([]);
    });

    test.todo("will inform system that entity was deleted");
    test.todo("will inform system of destroyed childElements");
    test.todo("will inform the relationship");
  });
});

describe("Systems", () => {
  let sut = new World();
  beforeEach(() => sut = new World());

  test("A new world has no systems", ()=>{
    expect(sut.getSystems()).toEqual([]);
  });

  describe("addSystem", ()=>{
    test("will add the system to the world", ()=>{
      const system: ISystem = {} as ISystem;
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });

    test("will not add the same system twice to the world", () => { 
      const system: ISystem = {} as ISystem;
      sut.addSystem(system);
      sut.addSystem(system);
      expect(sut.getSystems()).toEqual([system]);
    });
  });
  
  describe("removeSystem", ()=>{
    test("will remove the system from the world", ()=>{
      const system: ISystem = {} as ISystem;
      sut.addSystem(system);
      sut.removeSystem(system);
      expect(sut.getSystems()).toEqual([]);
    });

    test("will not throw when system was never added to the world", () => {
      const system: ISystem = {} as ISystem;
      expect(() => sut.removeSystem(system)).not.toThrow();
    });
  });
});

describe.todo("Relationship");
