import { describe, test, expect, vi, beforeEach } from 'vitest';
import { System } from './System';
import { Entity } from './Entity';
import { IComponentFactory } from './IComponentFactory';

describe('removeFrom', () => {
  let sut: System<string>;
  let factory: IComponentFactory<string>;

  beforeEach(() => {
    factory = {
      create: () => { throw new Error("Invoking non-faked method") },
    };
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

  test('invokes destroy on the component if destroy is defined', () => {
    const destroyMock = vi.fn();
    factory.destroy = destroyMock;
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity = new Entity(1);
    sut.addTo(entity);
    sut.removeFrom(entity);
    expect(destroyMock).toHaveBeenCalledWith('defaultComponent');
  });

  test('does not throw if destroy is not defined', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity = new Entity(1);
    sut.addTo(entity);
    expect(() => sut.removeFrom(entity)).not.toThrow();
  });
});
