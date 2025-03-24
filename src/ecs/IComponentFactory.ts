export interface IComponentFactory<T> {
  create(): T;
  destroy?(component: T): void; // Optional cleanup method for components
}
