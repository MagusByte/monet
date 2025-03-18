import { vi, test, expect, describe, beforeEach } from 'vitest';
import { Vec2d } from './Vec2d';

describe('Vec2d', () => {
  test('should create a Vec2d instance with correct x and y values', () => {
    const vec = new Vec2d(3, 4);
    expect(vec.x).toBe(3);
    expect(vec.y).toBe(4);
  });

  test('should create a Vec2d instance with transparent object', () => {
    const vec = new Vec2d({ x: 3, y: 4 });
    expect(vec.x).toBe(3);
    expect(vec.y).toBe(4);
  });

  test('should create a Vec2d instance with transparent object', () => {
    const original = new Vec2d({ x: 3, y: 4 });
    const vec = new Vec2d(original);
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

  describe("Vec2d.getNormalized()", () => {
    test.each([
      [0, 0, 0, 0],
      [9, 0, 1, 0],
      [0, 9, 0, 1],
      [1, 1, 0.7071, 0.7071],
      [-1, -1, -0.7071, -0.7071],
      [9, 9, 0.7071, 0.7071],
    ])("Vec2d(%i, %i).getNormalized() returns [%i, %i]", (x: number, y: number, nx: number, ny: number) => {
      const sut = new Vec2d(x, y);
      const n = sut.getNormalized();
      expect(n.x).toBeCloseTo(nx, 3);
      expect(n.y).toBeCloseTo(ny, 3);
    });
  })

  describe("static properties", () => {
    test("Vec2d.Zero", () => {
      expect(Vec2d.Zero).toEqual(new Vec2d(0, 0));
    });
    test("Vec2d.One", () => {
      expect(Vec2d.One).toEqual(new Vec2d(1, 1));
    });
  });

  describe("add", ()=>{
    test.each([
      [0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, 4, 6],
      [1, 2, -3, -4, -2, -2],
    ])("Vec2d.Add(Vec2d(%i, %i), Vec2d(%i, %i )) == Vec2d(%i, %i)", (x1, y1, x2, y2, rx, ry)=>{
      const a = new Vec2d(x1, y1);
      const b = new Vec2d(x2, y2);
      const r = Vec2d.Add(a, b);
      expect(r).toEqual(new Vec2d(rx, ry));
    });
  });

  describe("substract", ()=>{
    test.each([
      [0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, -2, -2],
      [1, 2, -3, -4, 4, 6],
    ])("Vec2d.Subtract(Vec2d(%i, %i), Vec2d(%i, %i )) == Vec2d(%i, %i)", (x1, y1, x2, y2, rx, ry)=>{
      const a = new Vec2d(x1, y1);
      const b = new Vec2d(x2, y2);
      const r = Vec2d.Subtract(a, b);
      expect(r).toEqual(new Vec2d(rx, ry));
    });
  });

  describe("multiply", ()=>{
    test.each([
      [0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0],
      [1, 2, 3, 4, 3, 8],
      [1, 2, -3, -4, -3, -8],
    ])("Vec2d.Multiply(Vec2d(%i, %i), Vec2d(%i, %i )) == Vec2d(%i, %i)", (x1, y1, x2, y2, rx, ry)=>{
      const a = new Vec2d(x1, y1);
      const b = new Vec2d(x2, y2);
      const r = Vec2d.Multiply(a, b);
      expect(r).toEqual(new Vec2d(rx, ry));
    });
  });

  describe("scale", ()=>{
    test.each([
      [0, 0, 0, 0, 0],
      [1, 3, 0, 0, 0],
      [1, 3, 1, 1, 3],
      [1, 3, 3, 3, 9],
      [1, 3, -3, -3, -9],
    ])("Vec2d.Scale(Vec2d(%i, %i), %i) == Vec2d(%i, %i)", (x1, y1, s, rx, ry)=>{
      const a = new Vec2d(x1, y1);
      const r = Vec2d.Scale(a, s);
      expect(r).toEqual(new Vec2d(rx, ry));
    });
  });
});

