import { expect, test } from "vitest";
import { Circle2d } from './Circle2d';

test('should have correct x, y, and radius properties', () => {
  const circle = new Circle2d(1, 2, 5);
  expect(circle.x).toBe(1);
  expect(circle.y).toBe(2);
  expect(circle.radius).toBe(5);
});

test('should allow updating x, y, and radius properties', () => {
  const circle = new Circle2d(1, 2, 3);
  circle.x = 4;
  circle.y = 5;
  circle.radius = 6;

  expect(circle.x).toBe(4);
  expect(circle.y).toBe(5);
  expect(circle.radius).toBe(6);
});

test('should handle negative radius', () => {
  const circle = new Circle2d(0, 0, -5);
  expect(circle.radius).toBe(-5);
});

test('should return true for a point inside the circle', () => {
  const circle = new Circle2d(0, 0, 5);
  expect(circle.isInside(3, 4)).toBe(true); // Point (3, 4) is inside the circle
});

test('should return false for a point outside the circle', () => {
  const circle = new Circle2d(0, 0, 5);
  expect(circle.isInside(6, 8)).toBe(false); // Point (6, 8) is outside the circle
});

test('should return true for a point on the edge of the circle', () => {
  const circle = new Circle2d(0, 0, 5);
  expect(circle.isInside(3, 4)).toBe(true); // Point (3, 4) lies on the edge of the circle
});

test('should handle negative coordinates correctly', () => {
  const circle = new Circle2d(-5, -5, 10);
  expect(circle.isInside(-10, -10)).toBe(true); // Point (-10, -10) is inside the circle
  expect(circle.isInside(0, 0)).toBe(true); // Point (0, 0) is inside the circle
});

test('should handle zero radius correctly', () => {
  const circle = new Circle2d(0, 0, 0);
  expect(circle.isInside(0, 0)).toBe(true); // Point (0, 0) is the center of the circle
  expect(circle.isInside(1, 1)).toBe(false); // Any other point is outside the circle
});
