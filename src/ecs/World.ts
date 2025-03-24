import { Entity } from './Entity'; // Ensure that './Entity' is the correct path to the Entity class file
import { ISystem } from './System'; // Updated import

export class World {
  private _lastKey = 0;
  private _entities: Entity[] = [];
  private _systems: ISystem[] = []; // Updated type
  
  getEntities() { return this._entities; }
  getSystems() { return this._systems; }
  
  createEntity() {
    const entity = new Entity(++this._lastKey);
    this._entities.push(entity);
    return entity;
  }

  destroyEntity(entity: Entity) {
    this._entities = this._entities.filter(x=> entity != x);
  }

  addSystem(system: ISystem) {
    if (!this._systems.includes(system)) {
      this._systems.push(system);
    }
  }

  removeSystem(system: ISystem) {
    this._systems = this._systems.filter(s => s !== system);
  }

}

