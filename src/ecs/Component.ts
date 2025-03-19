import type { ISystem } from "./ISystem";

export class Component<TData, TSystem extends ISystem<TData> = ISystem<TData>> {
  constructor(
    public data: TData,
    public readonly system: TSystem
  ) {
  }
}
