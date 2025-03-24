import { Entity } from './Entity';

export class EntityManager {
  private _lastKey = 0;
  private _entities: Entity[] = [];

  getEntities() { return this._entities; }

  createEntity() {
    const entity = new Entity(++this._lastKey);
    this._entities.push(entity);
    return entity;
  }

  destroyEntity(entity: Entity) {
    this._entities = this._entities.filter(x => entity !== x);
  }
}
