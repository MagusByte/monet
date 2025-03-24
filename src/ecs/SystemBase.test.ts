import { describe, test, expect, beforeEach, vi } from 'vitest';
import { SystemBase } from './SystemBase';
import { Entity } from './Entity';

class TestSystem extends SystemBase<string> {
  createNewComponent(): string {
    throw new Error("Calling an abstract method on TestSystem");
  }
}

describe('SystemBase', () => {
  let sut = new TestSystem();
  beforeEach(()=>{
    sut = new TestSystem();
  });

  test('should be defined', () => {
    expect(SystemBase).toBeDefined();
  });

  test('should allow creating a subclass', () => {
    expect(sut).toBeInstanceOf(SystemBase);
  });

  describe("addTo", () => {
    test('returns a newly created component', () => {
      const f = vi.spyOn(sut, "createNewComponent").mockReturnValue('defaultComponent');
      expect(sut.addTo({} as Entity)).toBe('defaultComponent');
      expect(f).toHaveBeenCalledOnce();
    });
  });
});
