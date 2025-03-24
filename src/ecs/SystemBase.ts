import { Entity } from "./Entity";
import { SystemUpdate } from "./SystemUpdate";
import { IComponentFactory } from "./IComponentFactory";

export class SystemBase<TComponent> {
  private readonly factory: IComponentFactory<TComponent>;

  constructor(factory: IComponentFactory<TComponent>) {
    this.factory = factory;
  }

  update(delta: SystemUpdate): void {
    // Default implementation: No operation
  }

  addTo(entity: Entity): TComponent {
    return this.factory.create();
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
