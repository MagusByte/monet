import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest';
import { GuiElement } from './GuiElement';
import { IGuiPainter } from './IGuiPainter';
describe("GuiElement", () => {
  //#region Hierarchy
  describe("Hierarchy", () => {
    test("Children is initially empty", () => {
      const sut = new GuiElement();
      expect(sut.getChildren()).toHaveLength(0);
    });

    test("Parent is initially undefined", () => {
      const sut = new GuiElement();
      expect(sut.getParent()).toBeUndefined();
    });

    test("Parent can be set", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setParent(dad);
      expect(sut.getParent()).toBe(dad);
    });

    test("Parent can't be set to self", () => {
      const sut = new GuiElement();
      expect(() => sut.setParent(sut)).toThrowError(/can't set parent to self/);
    });

    test("Parent can't be set to child of self", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setParent(dad);
      expect(() => dad.setParent(sut)).toThrowError(/can't set parent to self/);
    });

    test("Parent can be removed", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setParent(dad);
      sut.setParent(undefined); // Remove parent
      expect(sut.getParent()).toBeUndefined();
    });

    test("When parent is set, it will update the children of the parent", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setParent(dad);
      expect(dad.getChildren()).toContain(sut);
    });

    test("When parent is removed, it will remove itself from the children of the parent", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setParent(dad);
      sut.setParent(undefined)
      expect(dad.getChildren()).not.toContain(sut);
    });

    test("When child is added, it will set parent of child", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      expect(kid.getParent()).toBe(sut);
    });

    test("When child is added, it will update the children list", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      expect(sut.getChildren()).toContain(kid);
    });

    test("When child is added, it will only do so once", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      sut.addChild(kid);
      expect(sut.getChildren()).toHaveLength(1);
    });

    test("When child is removed, it will update the children list", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      sut.removeChild(kid);
      expect(sut.getChildren()).not.toContain(kid);
    });

    test("When child is removed, it will update the parent of child", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      sut.removeChild(kid);
      expect(kid.getParent()).toBeUndefined();
    });

    test("Can't add self as child", () => {
      const sut = new GuiElement();
      expect(() => sut.addChild(sut)).toThrowError(/can't add self as child or grand-child/);
    });

    test("Can't add self as grand-child", () => {
      const sut = new GuiElement();
      const kid = new GuiElement();
      sut.addChild(kid);
      expect(() => kid.addChild(sut)).toThrowError(/can't add self as child or grand-child/);
    });

    test("Add child should remove itself from the other parent", () => {
      const kid = new GuiElement();
      const mom = new GuiElement();
      const dad = new GuiElement();
      mom.addChild(kid);
      dad.addChild(kid);
      expect(mom.getChildren()).not.toContain(kid);
      expect(dad.getChildren()).toContain(kid);
    });

    test("remove should remove it self from the hierarchy", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      dad.addChild(sut);

      sut.remove();

      expect(sut.getParent()).toBeUndefined();
      expect(dad.getChildren()).not.toContain(sut);
    });
  });
  //#endregion hierarchy

  //#region relative position
  describe("relative position", () => {
    test("default relative position is [0,0]", () => {
      const sut = new GuiElement();
      expect(sut.getRelativePosition()).toEqual({ x: 0, y: 0 });
    });

    test("Set relative position stores value", () => {
      const sut = new GuiElement();
      sut.setRelativePosition({ x: 1, y: 2 });
      expect(sut.getRelativePosition()).toEqual({ x: 1, y: 2 });
    });
  });
  //#endregion relative position

  //#region absolute position
  describe("absolute position", () => {
    test("default absolute position is [0,0] (without parent)", () => {
      const sut = new GuiElement();
      expect(sut.getAbsolutePosition()).toEqual({ x: 0, y: 0 });
    });

    test("default absolute position matches relative position (without parent)", () => {
      const sut = new GuiElement();
      sut.setRelativePosition({ x: 1, y: 2 });
      expect(sut.getAbsolutePosition()).toEqual({ x: 1, y: 2 });
    });

    test("default absolute position matches relative position (with parent)", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      sut.setRelativePosition({ x: 1, y: 2 });
      dad.setRelativePosition({ x: 3, y: 4 });
      dad.addChild(sut);
      expect(sut.getAbsolutePosition()).toEqual({ x: 4, y: 6 });
    });

    test("default absolute position matches relative position (with grandparent)", () => {
      const sut = new GuiElement();
      const dad = new GuiElement();
      const granddad = new GuiElement();
      sut.setRelativePosition({ x: 1, y: 2 });
      dad.setRelativePosition({ x: 3, y: 4 });
      dad.addChild(sut);
      granddad.addChild(dad);
      granddad.setRelativePosition({ x: 5, y: 6 });
      expect(sut.getAbsolutePosition()).toEqual({ x: 9, y: 12 });
    });
  });
  //#endregion absolute position

  //#region size
  describe("size", () => {
    test("default size is [0,0]", () => {
      const sut = new GuiElement();
      expect(sut.getSize()).toEqual({ x: 0, y: 0 });
    });

    test("Set relative position stores value", () => {
      const sut = new GuiElement();
      sut.setSize({ x: 1, y: 2 });
      expect(sut.getSize()).toEqual({ x: 1, y: 2 });
    });
  });
  //#endregion size

  //#region visibility
  describe("visibility", () => {
    test("initially is visible", () => {
      const sut = new GuiElement();
      expect(sut.isVisible()).toBe(true)
    });

    test("can be hidden", () => {
      const sut = new GuiElement();
      sut.setVisible(false);
      expect(sut.isVisible()).toBe(false);
    });
  });
  //#endregion visibility

  //#region debug-name
  describe("debug-name", ()=>{
    test("initial debug-name is undefined", ()=>{
      const sut = new GuiElement();
      expect(sut.debugName).toBeUndefined();
    });

    test("can update debug-name", ()=>{
      const sut = new GuiElement();
      sut.debugName = "test123";
      expect(sut.debugName).toBe("test123");
    });
  });
  //#endregion debug-name

  //#region IsInside
  describe("IsInside", () => {
    let sut: GuiElement;
    beforeEach(()=>{
      sut = new GuiElement();
      sut.setRelativePosition({x: 20, y: 20});
      sut.setSize({x: 10, y: 10});
    });

    describe("Check if point is outside", ()=>{
      test("Check without parent", ()=>{
        expect(sut.isInside({ x: 20, y: 20 }), "top-left corner").toBe(true);
        expect(sut.isInside({ x: 30, y: 30 }), "bottom-right corner").toBe(true);
      });
      test("Point is left from control", () => {
        expect(sut.isInside({ x: 0, y: 20 })).toBe(false);
      });

      test("Point is right from control", ()=>{
        expect(sut.isInside({ x: 31, y: 20 })).toBe(false);
      });
      test("Point is above control", () => {
        expect(sut.isInside({ x: 20, y: 0 })).toBe(false);
      });
      test("Point is below control", ()=>{
        expect(sut.isInside({ x: 20, y: 31})).toBe(false);
      });
    });

    describe("Check when point is offset by parent", ()=>{
      beforeEach(()=>{
        const parent = new GuiElement();
        parent.setRelativePosition({x: 30, y: 30});
        sut.setParent(parent);
      });

      test("Check if point is inside", ()=>{
        expect(sut.isInside({ x: 50, y: 50 }), "top-left corner").toBe(true);
        expect(sut.isInside({ x: 60, y: 60 }), "bottom-right corner").toBe(true);
      });
      
      test("Point is left from control", () => {
        expect(sut.isInside({ x: 49, y: 50 })).toBe(false);
      });

      test("Point is right from control", ()=>{
        expect(sut.isInside({ x: 61, y: 50 })).toBe(false);
      });
      test("Point is above control", () => {
        expect(sut.isInside({ x: 50, y: 49 })).toBe(false);
      });
      test("Point is below control", ()=>{
        expect(sut.isInside({ x: 50, y: 61})).toBe(false);
      });
    });
  });
  //#endregion IsInside

  //#region draw
  describe("draw", ()=>{
    let sut: GuiElement;
    let child1: GuiElement;
    let child2: GuiElement;
    let painter: IGuiPainter;
    let child1DrawSpy: MockInstance;
    let child2DrawSpy: MockInstance;
    beforeEach(()=>{
      sut = new GuiElement();
      child1 = new GuiElement();
      child2 = new GuiElement();
      child1.setParent(sut);
      child2.setParent(sut);
      child1DrawSpy = vi.spyOn(child1, 'draw');
      child2DrawSpy = vi.spyOn(child2, 'draw');
      painter = {} as IGuiPainter;
    });
    
    test("should invoke draw method of children", ()=>{
      sut.draw(painter);

      expect(child1DrawSpy).toHaveBeenCalledWith(painter);
      expect(child2DrawSpy).toHaveBeenCalledWith(painter);

      expect(child1DrawSpy).toHaveBeenCalledBefore(child2DrawSpy);
    });
    test("should not invoke draw method of children when not visible", ()=>{
      sut.setVisible(false);
      sut.draw(painter);
      expect(child1DrawSpy).not.toHaveBeenCalled();
      expect(child2DrawSpy).not.toHaveBeenCalled();
    });
  });
  //#endregion draw
});
