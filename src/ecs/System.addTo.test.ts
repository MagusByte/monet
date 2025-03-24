import { describe, test, expect, vi, beforeEach } from 'vitest';
import { System } from './System';
import { IComponentFactory } from './IComponentFactory';


describe('addTo', () => {
  let sut: System<string, number>;
  let factory: IComponentFactory<string>;

  beforeEach(() => {
    factory = {
      create: () => { throw new Error("Invoking non-faked method"); }
    }
    sut = new System(factory);
  });

  test('returns a newly created component', () => {
    const createSpy = vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    expect(sut.addTo(0)).toBe('defaultComponent');
    expect(createSpy).toHaveBeenCalledOnce();
  });

  test('addTo updates internal registration', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    const newComponent = sut.addTo(0);
    const allComponents = sut.getAll();
    expect(allComponents).toHaveLength(1);
    expect(allComponents[0]).toEqual({ entity: 0, component: newComponent });
  });

  test('throws an error when the entity is already registered', () => {
    vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
    sut.addTo(0);
    expect(() => sut.addTo(0)).toThrowError('Entity is already registered.');
  });
});
