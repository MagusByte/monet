/**
 * Interface representing a system in the ECS (Entity-Component-System) architecture.
 */
export interface ISystem<TEntity> {
  /**
  * Removes the component associated with the specified entity.
  *
  * @param entity - The entity whose component will be removed.
  */
  removeFrom(entity: TEntity): void;

  /**
   * Checks if the specified entity has an associated component.
   *
   * @param entity - The entity to check.
   * @returns `true` if the entity has a component, otherwise `false`.
   */
  has(entity: TEntity): boolean;
}
