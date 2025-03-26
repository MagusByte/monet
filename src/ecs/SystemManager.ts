import { ISystem } from "./ISystem";

/**
 * Manages a collection of systems in an ECS (Entity Component System) architecture.
 * Provides methods to add, remove, and retrieve systems.
 */
export class SystemManager<TEntity> {
  /**
   * Internal list of systems managed by the SystemManager.
   */
  private _systems: ISystem<TEntity>[] = [];

  /**
   * Retrieves the list of systems currently managed.
   * 
   * @returns An array of systems.
   */
  getSystems() { return this._systems; }

  /**
   * Adds a system to the manager if it is not already present.
   * 
   * @param system - The system to be added.
   */
  addSystem(system: ISystem<TEntity>) {
    if (!this._systems.includes(system)) {
      this._systems.push(system);
    }
  }

  /**
   * Removes a system from the manager if it exists.
   * 
   * @param system - The system to be removed.
   */
  removeSystem(system: ISystem<TEntity>) {
    this._systems = this._systems.filter(s => s !== system);
  }
}
