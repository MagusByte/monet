import type { IGuiPainter } from "./IGuiPainter";
import type { Vec2d } from "./Vec2d";

export class GuiElement {
  private _visible = true;
  private _position: Vec2d = { x: 0, y: 0 };
  private _size: Vec2d = { x: 0, y: 0 };
  private _parent: GuiElement | undefined;
  private _children: GuiElement[] = [];
  public debugName?: string;

  getRelativePosition(): Vec2d {
    return { ...this._position };
  }

  getAbsolutePosition(): Vec2d {
    let pos = { ...this._position };
    let c = this._parent;
    while (c) {
      const cp = c.getRelativePosition();
      pos.x += cp.x;
      pos.y += cp.y;
      c = c._parent;
    }
    return pos;
  }

  setRelativePosition(newPos: Vec2d) {
    this._position = { x: newPos.x, y: newPos.y };
  }

  getSize(): Vec2d {
    return { ...this._size };
  }

  setSize(newPos: Vec2d) {
    this._size = { x: newPos.x, y: newPos.y };
  }

  isVisible() {
    return this._visible;
  }
  setVisible(v: boolean) {
    this._visible = v;
  }

  setParent(parent: GuiElement | undefined) {
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

  addChild(child: GuiElement) {
    // Skip if already have a parent child relationship
    if (child._parent == this) return;

    // Check if child is a parent (or grand-parent)
    let current: GuiElement | undefined = this;
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

  removeChild(child: GuiElement) {
    this._children = this._children.filter(x => x != child);
    child._parent = undefined;
  }

  isInside(point: Vec2d): boolean {
    const pos = this.getAbsolutePosition();
    const size = this.getSize();
    if (point.x < pos.x) return false;
    if (point.y < pos.y) return false;
    if (point.x > (pos.x + size.x)) return false;
    if (point.y > (pos.y + size.y)) return false;
    return true;
  }

  draw(painter: IGuiPainter) {
    if (!this.isVisible()) return;

    for (var child of this._children) {
      child.draw(painter);
    }
  }
}
