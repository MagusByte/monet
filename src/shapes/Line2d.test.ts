import { vi, test, expect, describe } from 'vitest';
import { Line2d } from './Line2d';
import { Vec2d } from './Vec2d';

test('should create an instance with given coordinates', () => {
  const line = new Line2d(1, 2, 3, 4);
  expect(line.x1).toBe(1);
  expect(line.y1).toBe(2);
  expect(line.x2).toBe(3);
  expect(line.y2).toBe(4);
});

test('should correctly update the coordinates', () => {
  const line = new Line2d(9, 10, 11, 12);
  line.x1 = 13;
  line.y1 = 14;
  line.x2 = 15;
  line.y2 = 16;
  expect(line.x1).toBe(13);
  expect(line.y1).toBe(14);
  expect(line.x2).toBe(15);
  expect(line.y2).toBe(16);
});

describe("getClosestPoint", () => {

  test('should calculate the closest point on the line', () => {
    const line = new Line2d(5, 0, 10, 0);
    expect(line.getClosestPoint(4, 0)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(5, 0)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(6, 0)).toEqual({ x: 6, y: 0 });
    expect(line.getClosestPoint(7, 0)).toEqual({ x: 7, y: 0 });
    expect(line.getClosestPoint(8, 0)).toEqual({ x: 8, y: 0 });
    expect(line.getClosestPoint(9, 0)).toEqual({ x: 9, y: 0 });
    expect(line.getClosestPoint(10, 0)).toEqual({ x: 10, y: 0 });
    expect(line.getClosestPoint(11, 0)).toEqual({ x: 10, y: 0 });

    expect(line.getClosestPoint(4, 10)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(5, 10)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(6, 10)).toEqual({ x: 6, y: 0 });
    expect(line.getClosestPoint(7, 10)).toEqual({ x: 7, y: 0 });
    expect(line.getClosestPoint(8, 10)).toEqual({ x: 8, y: 0 });
    expect(line.getClosestPoint(9, 10)).toEqual({ x: 9, y: 0 });
    expect(line.getClosestPoint(10, 10)).toEqual({ x: 10, y: 0 });
    expect(line.getClosestPoint(11, 10)).toEqual({ x: 10, y: 0 });

    expect(line.getClosestPoint(4, -10)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(5, -10)).toEqual({ x: 5, y: 0 });
    expect(line.getClosestPoint(6, -10)).toEqual({ x: 6, y: 0 });
    expect(line.getClosestPoint(7, -10)).toEqual({ x: 7, y: 0 });
    expect(line.getClosestPoint(8, -10)).toEqual({ x: 8, y: 0 });
    expect(line.getClosestPoint(9, -10)).toEqual({ x: 9, y: 0 });
    expect(line.getClosestPoint(10, -10)).toEqual({ x: 10, y: 0 });
    expect(line.getClosestPoint(11, -10)).toEqual({ x: 10, y: 0 });
  });

  test('should calculate the closest point on the line if it\'s point', () => {
    const line = new Line2d(50, 50, 50, 50);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    expect(line.getClosestPoint(x, y)).toEqual({ x: 50, y: 50 });
  });
});

describe("getDistanceFrom(...)", () => {
  test('should calculate the distance from the point', () => {
    const line = new Line2d(50, 50, 50, 50);
    vi.spyOn(line, "getClosestPoint").mockReturnValue(new Vec2d(0, 13));
    expect(line.getDistanceFrom(0, 0)).toBe(13);
  });
});
