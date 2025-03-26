/**
 * A factory interface for creating and managing components of type `T`.
 * 
 * This interface is commonly used in Entity-Component-System (ECS) architectures
 * to facilitate the dynamic creation and optional cleanup of components. It provides
 * a standardized way to instantiate and manage the lifecycle of components.
 * 
 * @typeParam T - The type of the component that this factory handles.
 */
export interface IComponentFactory<T> {
  /**
   * Creates a new instance of the component.
   * 
   * @returns A new instance of the component of type `T`.
   */
  create(): T;

  /**
   * Optional method to clean up or destroy a component.
   * 
   * This method can be implemented to handle any necessary cleanup logic
   * for the component before it is discarded.
   * 
   * @param component - The component instance to be destroyed.
   */
  destroy?(component: T): void;
}
