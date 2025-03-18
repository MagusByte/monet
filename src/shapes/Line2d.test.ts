import { test, expect } from 'vitest';
import { Line2d } from './Line2d';

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
