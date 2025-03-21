import { beforeEach, describe, expect, test } from "vitest";
import { World, Entity, ISystem } from './World';

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
