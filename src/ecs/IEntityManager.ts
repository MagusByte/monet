import { EntityEventMap, EventHandler } from "./EntityManagerEvents";

/**
 * Interface representing an entity manager that provides methods to manage entities
 * and handle entity-related events.
 *
 * @typeParam TEntity - The type of the entities managed by this entity manager.
 */
export interface IEntityManager<TEntity> {
  /**
   * Retrieves all entities managed by this entity manager.
   *
   * @returns An array of entities of type `TEntity`.
   */
  getEntities(): TEntity[];

  /**
   * Creates a new entity and adds it to the entity manager.
   *
   * @returns The newly created entity of type `TEntity`.
   */
  createEntity(): TEntity;

  /**
   * Destroys an existing entity and removes it from the entity manager.
   *
   * @param entity - The entity of type `TEntity` to be destroyed.
   */
  destroyEntity(entity: TEntity): void;

  /**
   * Adds an event handler for a specific entity-related event.
   *
   * @typeParam K - The key of the event in the `EntityEventMap` for the given `TEntity`.
   * @param event - The name of the event to listen for.
   * @param listener - The event handler function to be invoked when the event occurs.
   */
  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TEntity>): void;

  /**
   * Removes an event handler for a specific entity-related event.
   *
   * @typeParam K - The key of the event in the `EntityEventMap` for the given `TEntity`.
   * @param event - The name of the event for which the handler should be removed.
   * @param listener - The event handler function to be removed.
   */
  removeEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TEntity>): void;
}
