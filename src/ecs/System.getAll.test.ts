import { describe, test, expect, beforeEach } from 'vitest';
import { System } from './System';
import { IComponentFactory } from './IComponentFactory';

class TestComponentFactory implements IComponentFactory<string> {
  create(): string {
    throw new Error("Invoking non-faked method");
  }

  destroy(component: string): void {
    throw new Error("Invoking non-faked method");
  }
}

describe('getAll', () => {
  let sut: System<string>;

  beforeEach(() => {
    const factory = new TestComponentFactory();
    sut = new System(factory);
  });

  test('returns an empty array by default', () => {
    expect(sut.getAll()).toEqual([]);
  });
});
