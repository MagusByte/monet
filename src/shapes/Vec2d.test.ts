import { vi, test, expect, describe, beforeEach } from 'vitest';
import { Vec2d } from './Vec2d';

describe('Vec2d', () => {
  test('should create a Vec2d instance with correct x and y values', () => {
    const vec = new Vec2d(3, 4);
    expect(vec.x).toBe(3);
    expect(vec.y).toBe(4);
  });

  test('should allow updating x and y values', () => {
    const vec = new Vec2d(1, 2);
    vec.x = 5;
    vec.y = 6;
    expect(vec.x).toBe(5);
    expect(vec.y).toBe(6);
  });

  test('should handle negative values for x and y', () => {
    const vec = new Vec2d(-3, -7);
    expect(vec.x).toBe(-3);
    expect(vec.y).toBe(-7);
  });

  test('should handle zero values for x and y', () => {
    const vec = new Vec2d(0, 0);
    expect(vec.x).toBe(0);
    expect(vec.y).toBe(0);
  });

  describe('Vec2d.length', () => {
    test("should return 0 for vector with no length", () => {
      const sut = new Vec2d(0, 0)
      expect(sut.length).toBe(0);
    });

    test("should return length", () => {
      const sut = new Vec2d(0, 4)
      expect(sut.length).toBe(4);
    });
  });

  describe("static methods", ()=>{
    test("Vec2d.Zero", ()=>{
      expect(Vec2d.Zero).toEqual(new Vec2d(0, 0));
    })
  });
});

