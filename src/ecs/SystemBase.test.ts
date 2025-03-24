import { describe, test, expect } from 'vitest';
import { SystemBase, ComponentRegistration } from './SystemBase';
import { SystemUpdate } from './SystemUpdate';
import { Entity } from './Entity';

class TestSystem extends SystemBase<string> {
  update(delta: SystemUpdate): void {
    // Mock implementation
  }

  addTo(entity: Entity): string {
    return 'testComponent';
  }

  removeFrom(entity: Entity): void {
    // Mock implementation
  }

  getAll(): ComponentRegistration<string>[] {
    return [];
  }
}

describe('SystemBase', () => {
  test('should be defined', () => {
    expect(SystemBase).toBeDefined();
  });

  test('should allow creating a subclass', () => {
    const system = new TestSystem();
    expect(system).toBeInstanceOf(SystemBase);
  });

  test('should have abstract methods implemented in subclass', () => {
    const system = new TestSystem();
    expect(system.addTo({} as Entity)).toBe('testComponent');
    expect(system.getAll()).toEqual([]);
  });
});
