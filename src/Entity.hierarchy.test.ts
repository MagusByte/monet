import { beforeEach, expect, test } from 'vitest';
import { Entity } from './Entity';

let sut: Entity;

beforeEach(() => {
  sut = new Entity();
});

test("Children is initially empty", () => {
  expect(sut.getChildren()).toHaveLength(0);
});

test("Parent is initially undefined", () => {
  expect(sut.getParent()).toBeUndefined();
});

test("Parent can be set", () => {
  const dad = new Entity();
  sut.setParent(dad);
  expect(sut.getParent()).toBe(dad);
});

test("Parent can't be set to self", () => {
  expect(() => sut.setParent(sut)).toThrowError(/can't set parent to self/);
});

test("Parent can't be set to child of self", () => {
  const dad = new Entity();
  sut.setParent(dad);
  expect(() => dad.setParent(sut)).toThrowError(/can't set parent to self/);
});

test("Parent can be removed", () => {
  const dad = new Entity();
  sut.setParent(dad);
  sut.setParent(undefined); // Remove parent
  expect(sut.getParent()).toBeUndefined();
});

test("When parent is set, it will update the children of the parent", () => {
  const dad = new Entity();
  sut.setParent(dad);
  expect(dad.getChildren()).toContain(sut);
});

test("When parent is removed, it will remove itself from the children of the parent", () => {
  const dad = new Entity();
  sut.setParent(dad);
  sut.setParent(undefined)
  expect(dad.getChildren()).not.toContain(sut);
});

test("When child is added, it will set parent of child", () => {
  const kid = new Entity();
  sut.addChild(kid);
  expect(kid.getParent()).toBe(sut);
});

test("When child is added, it will update the children list", () => {
  const kid = new Entity();
  sut.addChild(kid);
  expect(sut.getChildren()).toContain(kid);
});

test("When child is added, it will only do so once", () => {
  const kid = new Entity();
  sut.addChild(kid);
  sut.addChild(kid);
  expect(sut.getChildren()).toHaveLength(1);
});

test("When child is removed, it will update the children list", () => {
  const kid = new Entity();
  sut.addChild(kid);
  sut.removeChild(kid);
  expect(sut.getChildren()).not.toContain(kid);
});

test("When child is removed, it will update the parent of child", () => {
  const kid = new Entity();
  sut.addChild(kid);
  sut.removeChild(kid);
  expect(kid.getParent()).toBeUndefined();
});

test("Can't add self as child", () => {
  expect(() => sut.addChild(sut)).toThrowError(/can't add self as child or grand-child/);
});

test("Can't add self as grand-child", () => {
  const kid = new Entity();
  sut.addChild(kid);
  expect(() => kid.addChild(sut)).toThrowError(/can't add self as child or grand-child/);
});

test("Add child should remove itself from the other parent", () => {
  const mom = new Entity();
  const dad = new Entity();
  mom.addChild(sut);
  dad.addChild(sut);
  expect(mom.getChildren()).not.toContain(sut);
  expect(dad.getChildren()).toContain(sut);
});

test("remove() should remove it self from the hierarchy", () => {
  const dad = new Entity();
  dad.addChild(sut);

  sut.remove();

  expect(sut.getParent()).toBeUndefined();
  expect(dad.getChildren()).not.toContain(sut);
});
