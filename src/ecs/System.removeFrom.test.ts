import { describe, test, expect, vi, beforeEach } from 'vitest';
import { System } from './System';
import { IComponentFactory } from './IComponentFactory';

describe('removeFrom', () => {
  let sut: System<string, number>;
  let factory: IComponentFactory<string>;

  beforeEach(() => {
    factory = {
      create: () => { throw new Error("Invoking non-faked method") },
    };
    sut = new System(factory);
  });

  test('removes the component associated with the given entity', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    sut.addTo(0);
    sut.addTo(1);
    sut.removeFrom(0);
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0].entity).toBe(1);
  });

  test('does nothing if the entity is not registered', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    sut.addTo(0);
    sut.removeFrom(1);
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0].entity).toBe(0);
  });

  test('invokes destroy on the component if destroy is defined', () => {
    const destroyMock = vi.fn();
    factory.destroy = destroyMock;
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    sut.addTo(0);
    sut.removeFrom(0);
    expect(destroyMock).toHaveBeenCalledWith('defaultComponent');
  });

  test('does not throw if destroy is not defined', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    sut.addTo(0);
    expect(() => sut.removeFrom(0)).not.toThrow();
  });
});
