import { beforeEach, describe, expect, it, vi } from "vitest";
import { EntityManager } from "./EntityManager";
import { IEntityFactory } from "./IEntityFactory";

class MockEntityFactory implements IEntityFactory<object> {
  create() {
    return {};
  }
}

describe("EntityManager Event Handlers", () => {
  let entityManager: EntityManager<object>;
  let mockFactory: MockEntityFactory;

  beforeEach(() => {
    mockFactory = new MockEntityFactory();
    entityManager = new EntityManager(mockFactory);
  });

  it("should call onDestroy event handlers when an entity is destroyed", () => {
    const entity = entityManager.createEntity();
    const onDestroyHandler = vi.fn();

    entityManager.addEventHandler("onDestroy", onDestroyHandler);
    entityManager.destroyEntity(entity);

    expect(onDestroyHandler).toHaveBeenCalledWith({entity});
  });

  it("should throw when adding the same event handler twice", () => {
    const onDestroyHandler = vi.fn();

    entityManager.addEventHandler("onDestroy", onDestroyHandler);
    expect(() =>
      entityManager.addEventHandler("onDestroy", onDestroyHandler)
    ).toThrowError("Handler is already registered");
  });

  it("should not call removed onDestroy event handlers", () => {
    const entity = entityManager.createEntity();
    const onDestroyHandler = vi.fn();

    entityManager.addEventHandler("onDestroy", onDestroyHandler);
    entityManager.removeEventHandler("onDestroy", onDestroyHandler);
    entityManager.destroyEntity(entity);

    expect(onDestroyHandler).not.toHaveBeenCalled();
  });

  it('should not throw when removing non-associated event handlers ', ()=>{
    const handler = vi.fn();
    expect(() => entityManager.removeEventHandler("onDestroy", handler)).not.toThrow();
  })

  it("should allow multiple onDestroy event handlers", () => {
    const entity = entityManager.createEntity();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    entityManager.addEventHandler("onDestroy", handler1);
    entityManager.addEventHandler("onDestroy", handler2);
    entityManager.destroyEntity(entity);

    expect(handler1).toHaveBeenCalledWith({ entity });
    expect(handler2).toHaveBeenCalledWith({ entity });
  });


  it("should allow invoke onDestroy event handlers in the provided order", () => {
    const entity = entityManager.createEntity();
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const handler3 = vi.fn();

    entityManager.addEventHandler("onDestroy", handler1);
    entityManager.addEventHandler("onDestroy", handler2);
    entityManager.addEventHandler("onDestroy", handler3);
    entityManager.removeEventHandler("onDestroy", handler2);
    
    entityManager.destroyEntity(entity);

    expect(handler1).toHaveBeenCalledBefore(handler3);
    expect(handler2).not.toHaveBeenCalled();
  });

  it("should not call onDestroy event handlers for entities not managed by the EntityManager", () => {
    const unmanagedEntity = {};
    const onDestroyHandler = vi.fn();

    entityManager.addEventHandler("onDestroy", onDestroyHandler);
    entityManager.destroyEntity(unmanagedEntity);

    expect(onDestroyHandler).not.toHaveBeenCalled();
  });
});
