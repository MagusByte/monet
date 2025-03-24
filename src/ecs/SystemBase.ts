import { Entity } from "./Entity";
import { SystemUpdate } from "./SystemUpdate";

export abstract class SystemBase<TComponent> {
  update(delta: SystemUpdate): void {
    // Default implementation: No operation
  }

  addTo(entity: Entity): TComponent {
    throw new Error("addTo method not implemented.");
  }

  removeFrom(entity: Entity): void {
    // Default implementation: No operation
  }

  getAll(): ComponentRegistration<TComponent>[] {
    return [];
  }
}

export interface ComponentRegistration<TComponent> {
  entity: Entity;
  component: TComponent;
}
