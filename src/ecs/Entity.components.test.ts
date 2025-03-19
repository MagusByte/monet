import { beforeEach, expect, test, vi } from 'vitest';
import { Entity } from './Entity';
import { Component } from './Component';
import { ISystem } from './ISystem';

type ComponentData = {};

let sut: Entity;
let component: Component<ComponentData>;
let system: ISystem<ComponentData>;

beforeEach(() => {
  sut = new Entity();
  system = {
    onAttach() { },
    onDetach() { },
  };
  component = new Component<ComponentData>({}, system);
});

test("should initially have no components", () => {
  expect(sut.getComponents()).toHaveLength(0);
});

test("should be able to attach a component", () => {
  sut.attach(component);
  expect(sut.getComponents()).to.include(component);
});

test("should not be able to attach same component twice", () => {
  sut.attach(component);
  sut.attach(component); // Second call
  expect(sut.getComponents()).toHaveLength(1);
});

test("detaching a non-existing component should not throw", () => {
  expect(() => sut.detach(component)).not.toThrow();
});

test("detaching a component should remove it from the interal list", () => {
  sut.attach(component);
  sut.detach(component);
  expect(sut.getComponents()).toHaveLength(0);
});

test("On attaching a component it should inform the associated system", () => {
  let spy = vi.spyOn(system, "onAttach");
  sut.attach(component);
  expect(spy).toHaveBeenCalledWith(sut, component);
});

test("The associated system should not be informed if the component is attached a second time", () => {
  let spy = vi.spyOn(system, "onAttach");
  sut.attach(component);
  sut.attach(component);
  expect(spy).toHaveBeenCalledExactlyOnceWith(sut, component);
});

test("On detaching a component it should inform the associated system", () => {
  let spy = vi.spyOn(system, "onDetach");
  sut.attach(component);
  sut.detach(component);
  expect(spy).toHaveBeenCalledWith(sut, component);
});

test("On detaching a non-existed component should not inform the associated system", () => {
  let spy = vi.spyOn(system, "onDetach");
  sut.detach(component);
  expect(spy).not.toHaveBeenCalled();
});
