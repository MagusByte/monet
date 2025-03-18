import { test, expect, describe, beforeEach } from 'vitest';
import { Quad2d } from './Quad2d';

test('should create an instance with given coordinates', () => {
  const quad = new Quad2d(1, 2, 3, 4);
  expect(quad.x1).toBe(1);
  expect(quad.y1).toBe(2);
  expect(quad.x2).toBe(3);
  expect(quad.y2).toBe(4);
});

test('should correctly update the coordinates', () => {
  const quad = new Quad2d(9, 10, 11, 12);
  quad.x1 = 13;
  quad.y1 = 14;
  quad.x2 = 15;
  quad.y2 = 16;
  expect(quad.x1).toBe(13);
  expect(quad.y1).toBe(14);
  expect(quad.x2).toBe(15);
  expect(quad.y2).toBe(16);
});

describe("low/max x/y", () => {

  describe.each([
    [1, 2, 3, 4],
    [3, 4, 1, 2], // All inversed
    [3, 2, 1, 4], // only-x inverse
    [1, 4, 3, 2], // only-y inversed
  ])("low and high for quad(%i, %i, %i, %i)", (x1, y1, x2, y2) => {
    let quad: Quad2d;

    beforeEach(() => {
      quad = new Quad2d(x1, y1, x2, y2);
    });

    test(`minX should be ${Math.min(x1, x2)}`, () => {
      expect(quad.minX).toBe(Math.min(x1, x2));
    });

    test(`maxX should be ${Math.max(x1, x2)}`, () => {
      expect(quad.maxX).toBe(Math.max(x1, x2));
    });

    test(`minY should be ${Math.min(y1, y2)}`, () => {
      expect(quad.minY).toBe(Math.min(y1, y2));
    });

    test(`maxY should be ${Math.max(y1, y2)}`, () => {
      expect(quad.maxY).toBe(Math.max(y1, y2));
    });
  });
});

describe("isInside", () => {
  let quad: Quad2d;

  beforeEach(() => {
    quad = new Quad2d(5, 7, 11, 13);
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
    expect(quad.isInside(x, y)).toBe(true);
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
    expect(quad.isInside(x, y)).toBe(false);
  });
});
