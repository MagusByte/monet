import { IComponentFactory } from "./IComponentFactory";
import { ISystem } from "./ISystem";

/**
 * A generic implementation of a system in the ECS architecture.
 * Manages the association between entities and their components.
 *
 * @template TComponent - The type of the component managed by the system.
 * @template TEntity - The type of the entity associated with the component.
 */
export class System<TComponent, TEntity> implements ISystem<TEntity> {
  /**
   * List of component registrations, each associating an entity with a component.
   */
  private registrations: ComponentRegistration<TComponent, TEntity>[] = [];

  /**
   * Creates a new instance of the System class.
   *
   * @param factory - The factory responsible for creating and destroying components.
   */
  constructor(
    private readonly factory: IComponentFactory<TComponent>
  ) { }

  /**
   * Adds a component to the specified entity.
   *
   * @param entity - The entity to which the component will be added.
   * @returns The newly created component.
   * @throws {Error} If the entity is already registered.
   */
  addTo(entity: TEntity): TComponent {
    if (this.registrations.some(reg => reg.entity === entity)) {
      throw new Error('Entity is already registered.');
    }
    const component = this.factory.create();
    this.registrations.push({ entity, component });
    return component;
  }

  /** @inheritdoc */
  removeFrom(entity: TEntity): void {
    const registration = this.registrations.find(reg => reg.entity === entity);
    if (registration) {
      this.factory.destroy?.(registration.component); // Invoke destroy if defined
      this.registrations = this.registrations.filter(reg => reg.entity !== entity);
    }
  }

  /**
   * Retrieves the component associated with the specified entity.
   *
   * @param entity - The entity whose component will be retrieved.
   * @returns The component associated with the entity, or `undefined` if not found.
   */
  getBy(entity: TEntity): TComponent | undefined {
    const registration = this.registrations.find(reg => reg.entity === entity);
    return registration?.component;
  }

  /** @inheritdoc */
  has(entity: TEntity): boolean {
    return this.registrations.some(reg => reg.entity === entity);
  }

  /**
   * Retrieves all component registrations managed by the system.
   *
   * @returns An array of component registrations.
   */
  getAll(): ComponentRegistration<TComponent, TEntity>[] {
    return this.registrations;
  }
}

/**
 * Represents the association between an entity and a component.
 *
 * @template TComponent - The type of the component.
 * @template TEntity - The type of the entity.
 */
export interface ComponentRegistration<TComponent, TEntity> {
  /**
   * The entity associated with the component.
   */
  entity: TEntity;

  /**
   * The component associated with the entity.
   */
  component: TComponent;
}
