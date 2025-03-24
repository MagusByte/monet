import { IEntityFactory } from "./IEntityFactory";

type EntityEvent<TEntity> = { entity: TEntity };

export type EntityDestroyedEvent<TEntity> = EntityEvent<TEntity>;

type EntityEventMap<TEntity> = {
  onDestroy: EntityDestroyedEvent<TEntity>;
};

type EventHandler<K extends keyof EntityEventMap<TEntity>, TEntity> = (event: EntityEventMap<TEntity>[K]) => void;
type EventHandlers<TEntity> = {
  [K in keyof EntityEventMap<TEntity>]: (EventHandler<K, TEntity>)[]
};

export interface IEntityManager<TEntity> {
  getEntities(): TEntity[];
  createEntity(): TEntity;
  destroyEntity(entity: TEntity): void;
}

export class EntityManager<TEntity> implements IEntityManager<TEntity> {
  private _entities: TEntity[] = [];
  private _eventHandlers: EventHandlers<TEntity> = {
    onDestroy: []
  };

  constructor(private readonly entityFactory: IEntityFactory<TEntity>) { }

  getEntities() { return this._entities; }

  createEntity() {
    const entity = this.entityFactory.create();
    this._entities.push(entity);
    return entity;
  }

  destroyEntity(entity: TEntity) {
    const index = this._entities.indexOf(entity);
    if (index !== -1) {
      this._entities.splice(index, 1);
      this.emitEvent("onDestroy", { entity: entity });
    }
  }

  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TEntity>) {
    if (this._eventHandlers[event].includes(listener)) {
      throw new Error("Handler is already registered");
    }
    this._eventHandlers[event].push(listener);
  }

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
