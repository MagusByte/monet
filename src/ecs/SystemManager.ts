import { ISystem } from './System';

export class SystemManager {
  private _systems: ISystem[] = [];

  getSystems() { return this._systems; }

  addSystem(system: ISystem) {
    if (!this._systems.includes(system)) {
      this._systems.push(system);
    }
  }

  removeSystem(system: ISystem) {
    this._systems = this._systems.filter(s => s !== system);
  }
}
