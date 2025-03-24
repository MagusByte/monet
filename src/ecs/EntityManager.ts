import { IEntityFactory } from "./IEntityFactory";

export interface IEntityManager<TEntity> {
  getEntities(): TEntity[];
  createEntity(): TEntity;
  destroyEntity(entity: TEntity): void;
}

type EventHandler = (...args: any[]) => void;

export class EntityManager<TEntity> implements IEntityManager<TEntity> {
  private _entities: TEntity[] = [];
  private _eventHandlers: { [event: string]: EventHandler[] } = {};

  constructor(private readonly entityFactory: IEntityFactory<TEntity>) { }

  getEntities() { return this._entities; }

  createEntity() {
    const entity = this.entityFactory.create();
    this._entities.push(entity);
    return entity;
  }

  addEventHandler(event: string, listener: EventHandler) {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = [];
    }
    this._eventHandlers[event].push(listener);
  }

  removeEventHandler(event: string, listener: EventHandler) {
    if (!this._eventHandlers[event]) return;
    this._eventHandlers[event] = this._eventHandlers[event].filter(l => l !== listener);
  }

  private _emitEvent(event: string, ...args: any[]) {
    if (!this._eventHandlers[event]) return;
    for (const listener of this._eventHandlers[event]) {
      listener(...args);
    }
  }

  destroyEntity(entity: TEntity) {
    this._entities = this._entities.filter(x => entity !== x);
    this._emitEvent("onDestroy", entity);
  }
}
