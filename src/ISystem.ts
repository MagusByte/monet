import type { Entity } from "./Entity";
import type { Component } from "./Component";

export interface ISystem<TData> {
  onAttach(node: Entity, component: Component<TData>): void;
  onDetach(node: Entity, component: Component<TData>): void;
}
