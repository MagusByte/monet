export interface IComponentFactory<T> {
  create(): T;
  destroy(component: T): void;
}
