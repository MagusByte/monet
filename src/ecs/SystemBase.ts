import { Entity } from "./Entity";
import { SystemUpdate } from "./SystemUpdate";

export abstract class SystemBase<TComponent> {
  abstract update(delta: SystemUpdate): void;
  abstract addTo(entity: Entity): TComponent;
  abstract removeFrom(entity: Entity): void;
  abstract getAll(): ComponentRegistration<TComponent>[];
}

export interface ComponentRegistration<TComponent> {
  entity: Entity;
  component: TComponent;
}
