import { Entity } from "./Entity";
import { SystemUpdate } from "./SystemUpdate";
import { IComponentFactory } from "./IComponentFactory";

export class SystemBase<TComponent> {
  private registrations: ComponentRegistration<TComponent>[] = [];

  constructor(
    private readonly factory: IComponentFactory<TComponent>
  ) { }

  update(delta: SystemUpdate): void {
    // Default implementation: No operation
  }

  addTo(entity: Entity): TComponent {
    const component = this.factory.create();
    this.registrations.push({ entity, component });
    return component;
  }

  removeFrom(entity: Entity): void {
    this.registrations = this.registrations.filter(reg => reg.entity !== entity);
  }

  getAll(): ComponentRegistration<TComponent>[] {
    return this.registrations;
  }
}

export interface ComponentRegistration<TComponent> {
  entity: Entity;
  component: TComponent;
}
