import { Entity } from "./Entity";
import { IComponentFactory } from "./IComponentFactory";

export interface ISystem {
}

export class System<TComponent, TEntity = Entity> implements ISystem {
  private registrations: ComponentRegistration<TComponent, TEntity>[] = [];

  constructor(
    private readonly factory: IComponentFactory<TComponent>
  ) { }

  addTo(entity: TEntity): TComponent {
    if (this.registrations.some(reg => reg.entity === entity)) {
      throw new Error('Entity is already registered.');
    }
    const component = this.factory.create();
    this.registrations.push({ entity, component });
    return component;
  }

  removeFrom(entity: TEntity): void {
    const registration = this.registrations.find(reg => reg.entity === entity);
    if (registration) {
      this.factory.destroy?.(registration.component); // Invoke destroy if defined
      this.registrations = this.registrations.filter(reg => reg.entity !== entity);
    }
  }

  getBy(entity: TEntity): TComponent | undefined {
    const registration = this.registrations.find(reg => reg.entity === entity);
    return registration?.component;
  }

  has(entity: TEntity): boolean {
    return this.registrations.some(reg => reg.entity === entity);
  }

  getAll(): ComponentRegistration<TComponent, TEntity>[] {
    return this.registrations;
  }
}

export interface ComponentRegistration<TComponent, TEntity = Entity> {
  entity: TEntity;
  component: TComponent;
}
