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
  });
});
