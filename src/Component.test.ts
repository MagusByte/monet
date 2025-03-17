import { beforeEach, expect, test } from 'vitest';
import { Component } from './Component';
import type { ISystem } from './ISystem';

type MockSystem = ISystem<any>;
let sut: Component<any>;
let mockData: any;
let mockSystem: MockSystem;

beforeEach(() => {
  mockData = { key: 'value' };
  mockSystem = {
    onAttach() { },
    onDetach() { },
  };
  sut = new Component(mockData, mockSystem);
});

test('should initialize with given data', () => {
  expect(sut.data).toBe(mockData);
});

test('should initialize with given system', () => {
  expect(sut.system).toBe(mockSystem);
});

test('system should be readonly', () => {
  expect(() => {
    // @ts-expect-error
    sut.system = new MockSystem();
  }).toThrowError();
});
