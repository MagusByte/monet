import { describe, test, expect, vi, beforeEach } from 'vitest';
import { System } from './System';
import { Entity } from './Entity';
import { IComponentFactory } from './IComponentFactory';


describe('addTo', () => {
  let sut: System<string>;
  let factory: IComponentFactory<string>;

  beforeEach(() => {
    factory = {
      create: () => { throw new Error("Invoking non-faked method"); }
    }
    sut = new System(factory);
  });

  test('returns a newly created component', () => {
    const createSpy = vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    expect(sut.addTo({} as Entity)).toBe('defaultComponent');
    expect(createSpy).toHaveBeenCalledOnce();
  });

  test('addTo updates internal registration', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity = {} as Entity;
    const newComponent = sut.addTo(entity);
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0]).toEqual({ entity, component: newComponent });
  });

  test('throws an error when the entity is already registered', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const entity = new Entity(1);
    sut.addTo(entity);
    expect(() => sut.addTo(entity)).toThrowError('Entity is already registered.');
  });
});
