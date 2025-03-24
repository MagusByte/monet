import { beforeEach, describe, expect, test } from "vitest";
import { Entity } from './Entity';
import { EntityManager } from "./EntityManager";

describe("EntityManager", () => {
  test("Initially has no entities", () => {
    const sut = new EntityManager();
    expect(sut.getEntities()).toEqual([]);
  });

  describe("createEntity()", () => {
    let sut = new EntityManager();
    beforeEach(() => sut = new EntityManager());

    test("will return a new entity", () => {
      const entity = sut.createEntity();
      expect(entity).toBeInstanceOf(Entity);
    });

    test("will store newly created entity", () => {
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
    let sut = new EntityManager();
    beforeEach(() => sut = new EntityManager());

    test("will remove the stored entity", () => {
      const entity = sut.createEntity();
      sut.destroyEntity(entity);
      expect(sut.getEntities()).toEqual([]);
    });

    test.todo("will inform system that entity was deleted");
    test.todo("will inform system of destroyed childElements");
    test.todo("will inform the relationship");
  });
});
