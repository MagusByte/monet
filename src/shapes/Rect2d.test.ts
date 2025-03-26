import { test, expect, describe, beforeEach } from 'vitest';
import { Rect2d } from './Rect2d';

test('should create an instance with given coordinates', () => {
  const rect = new Rect2d(1, 2, 3, 4);
  expect(rect.x1).toBe(1);
  expect(rect.y1).toBe(2);
  expect(rect.x2).toBe(3);
  expect(rect.y2).toBe(4);
});

test('should correctly update the coordinates', () => {
  const rect = new Rect2d(9, 10, 11, 12);
  rect.x1 = 13;
  rect.y1 = 14;
  rect.x2 = 15;
  rect.y2 = 16;
  expect(rect.x1).toBe(13);
  expect(rect.y1).toBe(14);
  expect(rect.x2).toBe(15);
  expect(rect.y2).toBe(16);
});

describe("low/max x/y", () => {

  describe.each([
    [1, 2, 3, 4],
    [3, 4, 1, 2], // All inversed
    [3, 2, 1, 4], // only-x inverse
    [1, 4, 3, 2], // only-y inversed
  ])("low and high for rect(%i, %i, %i, %i)", (x1, y1, x2, y2) => {
    let rect: Rect2d;

    beforeEach(() => {
      rect = new Rect2d(x1, y1, x2, y2);
    });

    test(`minX should be ${Math.min(x1, x2)}`, () => {
      expect(rect.minX).toBe(Math.min(x1, x2));
    });

    test(`maxX should be ${Math.max(x1, x2)}`, () => {
      expect(rect.maxX).toBe(Math.max(x1, x2));
    });

    test(`minY should be ${Math.min(y1, y2)}`, () => {
      expect(rect.minY).toBe(Math.min(y1, y2));
    });

    test(`maxY should be ${Math.max(y1, y2)}`, () => {
      expect(rect.maxY).toBe(Math.max(y1, y2));
    });
  });
});

describe("isInside", () => {
  let rect: Rect2d;

  beforeEach(() => {
    rect = new Rect2d(5, 7, 11, 13);
  });

  // Testing all points
  test.each([
    [5, 7], [6, 7], [7, 7], [8, 7], [11, 7],
    [5, 8], [6, 8], [7, 8], [8, 8], [11, 8],
    [5, 9], [6, 9], [7, 9], [8, 9], [11, 9],
    [5, 10], [6, 10], [7, 10], [8, 10], [11, 10],
    [5, 11], [6, 11], [7, 11], [8, 11], [11, 11],
    [5, 12], [6, 12], [7, 12], [8, 12], [11, 12],
    [5, 13], [6, 13], [7, 13], [8, 13], [11, 13],
  ])('isInside(%i, %i) should return true', (x, y) => {
    expect(rect.isInside(x, y)).toBe(true);
  });

  // Testing outside 
  // [
  //   TL, T, TR,
  //    L,     R,
  //   BL, B, BR,
  // ]
  test.each([
    [4, 6], [7, 6], [12, 6],
    [4, 10], [12, 10],
    [4, 14], [7, 14], [12, 14],
  ])('isInside(%i, %i) should return false', (x, y) => {
    expect(rect.isInside(x, y)).toBe(false);
  });
});
