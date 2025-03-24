import { beforeEach, describe, expect, test, vi } from "vitest";
import { EntityManager } from "./EntityManager";
import { IEntityFactory } from "./IEntityFactory";

class NumberFactory implements IEntityFactory<number> {
  create(): number {
    throw new Error("Invoking non-faked method");
  }
}

describe("EntityManager", () => {
  test("Initially has no entities", () => {
    const sut = new EntityManager(new NumberFactory());
    expect(sut.getEntities()).toEqual([]);
  });

  describe("createEntity()", () => {
    let entityFactory: IEntityFactory<number>;
    let sut: EntityManager<number>;
    beforeEach(() => {
      entityFactory = new NumberFactory();
      sut = new EntityManager(entityFactory);
    });

    test("will return a new entity", () => {
      vi.spyOn(entityFactory, 'create').mockReturnValue(12);
      const entity = sut.createEntity();
      expect(entity).toBe(12);
    });

    test("will store newly created entity", () => {
      vi.spyOn(entityFactory, 'create').mockReturnValue(12);
      const entity = sut.createEntity();
      expect(sut.getEntities()).toEqual([entity]);
      expect(entity).toBe(12);
    });

    test('new entities should be different', () => {
      vi.spyOn(entityFactory, 'create').mockReturnValue(12);
      const e1 = sut.createEntity();
      vi.spyOn(entityFactory, 'create').mockReturnValue(13);
      const e2 = sut.createEntity();
      expect(e1).not.toBe(e2);
    });
  });

  describe("destroyEntity()", () => {
    let entityFactory: IEntityFactory<number>;
    let sut: EntityManager<number>;
    beforeEach(() => {
      entityFactory = new NumberFactory();
      sut = new EntityManager(entityFactory);
    });

    test("will remove the stored entity", () => {
      vi.spyOn(entityFactory, 'create').mockReturnValue(12);
      const entity = sut.createEntity();
      sut.destroyEntity(entity);
      expect(sut.getEntities()).toEqual([]);
    });
  });
});
