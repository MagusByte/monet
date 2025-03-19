import type { Entity } from "./Entity";
import type { Component } from "./Component";

export interface ISystem<TData> {
  onAttach(entity: Entity, component: Component<TData>): void;
  onDetach(entity: Entity, component: Component<TData>): void;
}
