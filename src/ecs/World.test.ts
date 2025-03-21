import { expect, test } from "vitest";
import { World } from './World';

test("Can create a new world", () => {
  expect(() => new World()).not.toThrow();
});
