import { describe, test, expect, vi, beforeEach } from 'vitest';
import { System } from './System';
import { Entity } from './Entity';
import { IComponentFactory } from './IComponentFactory';

class TestComponentFactory implements IComponentFactory<string> {
  create(): string {
    throw new Error("Invoking non-faked method");
  }

  destroy(component: string): void {
    throw new Error("Invoking non-faked method");
  }
}

describe('removeFrom', () => {
  let sut: System<string>;
  let factory: TestComponentFactory;

  beforeEach(() => {
    factory = new TestComponentFactory();
    sut = new System(factory);
  });

  test('removes the component associated with the given entity', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity1 = new Entity(1);
    const entity2 = new Entity(2);
    sut.addTo(entity1);
    sut.addTo(entity2);
    sut.removeFrom(entity1);
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0].entity).toBe(entity2);
  });

  test('does nothing if the entity is not registered', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity = new Entity(1);
    sut.addTo(entity);
    sut.removeFrom(new Entity(2));
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0].entity).toBe(entity);
  });
});
