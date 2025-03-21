export class OldEntity {
  private _parent: OldEntity | undefined;
  private _children: OldEntity[] = [];
  constructor(public readonly name?: string){}

  setParent(parent: OldEntity | undefined) {
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

  addChild(child: OldEntity) {
    // Skip if already have a parent child relationship
    if (child._parent == this) return;

    // Check if child is a parent (or grand-parent)
    let current: OldEntity | undefined = this;
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

  removeChild(child: OldEntity) {
    this._children = this._children.filter(x => x != child);
    child._parent = undefined;
  }
}
