import type { Component } from "./Component";

export class Entity {
  private _parent: Entity | undefined;
  private _children: Entity[] = [];
  private _components: Set<Component<unknown>> = new Set<Component<unknown>>();
  constructor(public readonly name?: string){}

  setParent(parent: Entity | undefined) {
    // Check if new parent (or anyone else up in the hierarchy) is the current element
    let current = parent;
    while (current) {
      if (current == this) throw new Error("can't set parent to self");
      current = current._parent;
    }

    // Check if we need to remove ourself from the existing parent
    if (this._parent) {
      this._parent._children = this._parent._children.filter(x => x != this);
    }

    //
    this._parent = parent;

    // Add self to children of new parent (if exist)
    parent?._children.push(this);
  }

  remove() {
    this.setParent(undefined);
  }

  getParent() {
    return this._parent;
  }

  getChildren() {
    return this._children;
  }

  addChild(child: Entity) {
    // Skip if already have a parent child relationship
    if (child._parent == this) return;

    // Check if child is a parent (or grand-parent)
    let current: Entity | undefined = this;
    while (current) {
      if (current == child) throw new Error("can't add self as child or grand-child");
      current = current._parent;
    }

    // Check if child already has a parent, if so remove it.
    if (child._parent != undefined) child.setParent(undefined);

    // Update the values
    child._parent = this;
    this._children.push(child);
  }

  removeChild(child: Entity) {
    this._children = this._children.filter(x => x != child);
    child._parent = undefined;
  }

  getComponents() {
    return this._components;
  }

  attach<T>(component: Component<T>) {
    if (this._components.has(component)) return;
    this._components.add(component);
    component.system.onAttach(this, component);
  }

  detach<T>(component: Component<T>) {
    if (!this._components.has(component)) return;
    this._components.delete(component);
    component.system.onDetach(this, component);
  }
}
