/**
 * Interface for a factory that creates instances of a specific type.
 *
 * @template T - The type of object that this factory creates.
 */
export interface IEntityFactory<T> {
  /**
   * Creates an instance of the specified type.
   *
   * @returns {T} A new instance of the specified type.
   */
  create(): T;
}
