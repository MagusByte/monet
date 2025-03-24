import { describe, test, expect, beforeEach, vi } from 'vitest';
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

describe('System', () => {
  let sut: System<string>;
  let factory: TestComponentFactory;

  beforeEach(() => {
    factory = new TestComponentFactory();
    sut = new System(factory);
  });

  test('should be defined', () => {
    expect(System).toBeDefined();
  });

  test('should allow instantiation with a component factory', () => {
    expect(sut).toBeInstanceOf(System);
  });
});
