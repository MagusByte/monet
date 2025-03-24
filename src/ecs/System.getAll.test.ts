import { describe, test, expect, beforeEach } from 'vitest';
import { System } from './System';

describe('getAll', () => {
  let sut: System<string>;

  beforeEach(() => {
    sut = new System({
      create: () => { throw new Error("Invoking non-faked method"); }
    });
  });

  test('returns an empty array by default', () => {
    expect(sut.getAll()).toEqual([]);
  });
});
