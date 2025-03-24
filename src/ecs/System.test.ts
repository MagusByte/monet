import { describe, test, expect, beforeEach, vi } from 'vitest';
import { System } from './System';
import { IComponentFactory } from './IComponentFactory';

describe('System', () => {
  let sut: System<string, number>;
  let factory: IComponentFactory<string>;

  beforeEach(() => {
    factory = {
      create: () => { throw new Error("Invoking non-faked method") }
    };
    sut = new System(factory);
  });

  test('should be defined', () => {
    expect(System).toBeDefined();
  });

  test('should allow instantiation with a component factory', () => {
    expect(sut).toBeInstanceOf(System);
  });
});
