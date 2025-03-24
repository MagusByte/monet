import { IEntityFactory } from "./IEntityFactory";

export interface IEntityManager<TEntity> {
  getEntities(): TEntity[];
  createEntity(): TEntity;
  destroyEntity(entity: TEntity): void;
}

type EntityEvent<TEntity> = { entity: TEntity };
type EntityDestroyedEvent<TEntity> = EntityEvent<TEntity>;

type EntityEventMap<TEntity> = {
  onDestroy: EntityDestroyedEvent<TEntity>;
};

export class EntityManager<TEntity> implements IEntityManager<TEntity> {
  private _entities: TEntity[] = [];
  private _eventHandlers: { [K in keyof EntityEventMap<TEntity>]?: ((event: EntityEventMap<TEntity>[K])=>void)[] } = {};

  constructor(private readonly entityFactory: IEntityFactory<TEntity>) { }

  getEntities() { return this._entities; }

  createEntity() {
    const entity = this.entityFactory.create();
    this._entities.push(entity);
    return entity;
  }

  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: ((event: EntityEventMap<TEntity>[K])=>void)) {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = [];
    }
    this._eventHandlers[event]!.push(listener);
  }

  removeEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: ((event: EntityEventMap<TEntity>[K])=>void)) {
    if (!this._eventHandlers[event]) return;
    this._eventHandlers[event] = this._eventHandlers[event]!.filter(l => l !== listener);
  }

  private emitEvent<K extends keyof EntityEventMap<TEntity>>(event: K, args: EntityEventMap<TEntity>[K]) {
    if (!this._eventHandlers[event]) return;
    for (const listener of this._eventHandlers[event]!) {
      listener(args);
    }
  }

  destroyEntity(entity: TEntity) {
    const index = this._entities.indexOf(entity);
    if (index !== -1) {
      this._entities.splice(index, 1);
      this.emitEvent("onDestroy", { entity: entity });
    }
  }
}
