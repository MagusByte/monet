import { describe, test, expect, beforeEach, vi } from 'vitest';
import { SystemBase } from './SystemBase';
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

describe('SystemBase', () => {
  let sut: SystemBase<string>;
  let factory: TestComponentFactory;

  beforeEach(() => {
    factory = new TestComponentFactory();
    sut = new SystemBase(factory);
  });

  test('should be defined', () => {
    expect(SystemBase).toBeDefined();
  });

  test('should allow instantiation with a component factory', () => {
    expect(sut).toBeInstanceOf(SystemBase);
  });

  describe('addTo', () => {
    test('returns a newly created component', () => {
      const createSpy = vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
      expect(sut.addTo({} as Entity)).toBe('defaultComponent');
      expect(createSpy).toHaveBeenCalledOnce();
    });

    test('addTo updates internal registration', () => {
      // Arrange
      vi.spyOn(factory, 'create').mockReturnValue('defaultComponent');
      const entity = {} as Entity;

      // Act
      const newComponent = sut.addTo(entity);

      // Assert
      const allComponents = sut.getAll();
      expect(allComponents).toHaveLength(1);
      expect(allComponents[0]).toEqual({ entity, component: newComponent });
    });
  });

  describe('getAll', () => {
    test('returns an empty array by default', () => {
      expect(sut.getAll()).toEqual([]);
    });
  });

  describe('addTo and getAll integration', () => {
    
  });
});
