import { EventHandlers, EntityEventMap, EventHandler } from "./EntityManagerEvents";
import { IEntityFactory } from "./IEntityFactory";
import { IEntityManager } from "./IEntityManager";

/**
 * The `EntityManager` class is responsible for managing a collection of entities of type `TEntity`.
 * It provides functionality for creating, destroying, and retrieving entities, as well as managing
 * event handlers for entity-related events.
 *
 * @template TEntity - The type of entities managed by the `EntityManager`.
 *
 * @implements {IEntityManager<TEntity>}
 *
 * @remarks
 * This class uses an `IEntityFactory` to create new entities and maintains an internal list of
 * entities. It also supports event handling for custom events such as "onDestroy".
 */
export class EntityManager<TEntity> implements IEntityManager<TEntity> {
  private _entities: TEntity[] = [];
  private _eventHandlers: EventHandlers<TEntity> = {
    onDestroy: []
  };

  /**
   * Creates an instance of the EntityManager.
   *
   * @param entityFactory - A factory responsible for creating entities of type `TEntity`.
   */
  constructor(private readonly entityFactory: IEntityFactory<TEntity>) { }

  /**
   * Retrieves the collection of all entities managed by the EntityManager.
   *
   * @returns An array or collection containing all entities.
   */
  getEntities() { return this._entities; }

  /**
   * Creates a new entity using the entity factory and adds it to the internal entity list.
   *
   * @returns The newly created entity.
   */
  createEntity() {
    const entity = this.entityFactory.create();
    this._entities.push(entity);
    return entity;
  }

  /**
   * Destroys the specified entity by removing it from the internal entity list
   * and emitting an "onDestroy" event.
   *
   * @param entity - The entity to be destroyed.
   * 
   * @remarks
   * If the entity does not exist in the internal list, no action is taken.
   * The "onDestroy" event is emitted with the destroyed entity as part of the payload.
   */
  destroyEntity(entity: TEntity) {
    const index = this._entities.indexOf(entity);
    if (index !== -1) {
      this._entities.splice(index, 1);
      this.emitEvent("onDestroy", { entity: entity });
    }
  }

  /**
   * Registers an event handler for a specific event type.
   *
   * @template K - The type of the event key, constrained to the keys of `EntityEventMap<TEntity>`.
   * @template TEntity - The type of the entity associated with the event.
   * @param event - The event type to listen for.
   * @param listener - The event handler function to be invoked when the event is triggered.
   * @throws {Error} If the handler is already registered for the specified event.
   */
  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TEntity>) {
    if (this._eventHandlers[event].includes(listener)) {
      throw new Error("Handler is already registered");
    }
    this._eventHandlers[event].push(listener);
  }

  /**
   * Removes an event handler for a specific event type.
   *
   * @template K - The type of the event key from the `EntityEventMap`.
   * @param event - The event type for which the handler should be removed.
   * @param listener - The event handler function to be removed.
   *
   * @remarks
   * If the specified event handler is not found in the list of handlers for the given event,
   * the method will exit without making any changes.
   */
  removeEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TEntity>) {
    const handlers = this._eventHandlers[event];
    const index = handlers.findIndex(handler => handler === listener);
    if (index === -1) return;
    handlers.splice(index, 1);
  }

  private emitEvent<K extends keyof EntityEventMap<TEntity>>(event: K, args: EntityEventMap<TEntity>[K]) {
    for (const listener of this._eventHandlers[event]) {
      listener(args);
    }
  }
}
