import { Entity } from "./Entity";
import { SystemUpdate } from "./SystemUpdate";
import { IComponentFactory } from "./IComponentFactory";

export interface ISystem {
  update(delta: SystemUpdate): void;
}
export class System<TComponent> implements ISystem {
  private registrations: ComponentRegistration<TComponent>[] = [];

  constructor(
    private readonly factory: IComponentFactory<TComponent>
  ) { }

  update(delta: SystemUpdate): void {
    // Default implementation: No operation
  }

  addTo(entity: Entity): TComponent {
    if (this.registrations.some(reg => reg.entity === entity)) {
      throw new Error('Entity is already registered.');
    }
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
