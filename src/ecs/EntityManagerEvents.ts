/**
 * Represents an event associated with an entity. This is intended as base class.
 *
 * @template TEntity - The type of the entity involved in the event.
 */
export type EntityEvent<TEntity> = { entity: TEntity };

/**
 * Represents an event that is triggered when an entity is destroyed.
 *
 * @template TEntity - The type of the entity associated with the event.
 */
export type EntityDestroyedEvent<TEntity> = EntityEvent<TEntity>;

/**
 * Represents a mapping of entity-related events for a specific entity type.
 *
 * @template TEntity - The type of the entity associated with the events.
 *
 * @remarks
 * This type is used to define the structure of events that can be emitted
 * by the entity manager. Specifically, it includes an `onDestroy` event
 * that is triggered when an entity is deleted. This allows systems
 * (derived from `ISystem`) to be notified and respond appropriately
 * when entities are removed from the system.
 *
 * @example
 * A system can listen to the `onDestroy` event to clean up resources
 * or perform other necessary actions when an entity is destroyed.
 */
export type EntityEventMap<TEntity> = {
  onDestroy: EntityDestroyedEvent<TEntity>;
};

/**
 * Represents a handler function for a specific type of entity event.
 *
 * @template K - The key of the event type in the `EntityEventMap` for the given entity.
 * @template TEntity - The type of the entity associated with the event.
 * @param event - The event object corresponding to the specified event type.
 */
export type EventHandler<K extends keyof EntityEventMap<TEntity>, TEntity> = (event: EntityEventMap<TEntity>[K]) => void;

/**
 * Represents a mapping of event types to their respective handlers for a given entity type.
 *
 * @template TEntity - The type of the entity associated with the events.
 *
 * @typeParam K - The keys of the `EntityEventMap` corresponding to the event types.
 * 
 * Each key in the `EntityEventMap<TEntity>` is associated with an array of event handler functions
 * that handle the specific event type for the given entity.
 */
export type EventHandlers<TEntity> = {
  [K in keyof EntityEventMap<TEntity>]: (EventHandler<K, TEntity>)[]
};

