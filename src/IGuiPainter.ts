import type { Vec2d } from "./Vec2d";

type PaintFunc = (painter: IGuiPainter) => void;

/**
 * This is an interface which implements most of the functions of CanvasRenderingContext2D.
 * It also removes any function that can prevent the GuiElement from being painted correctly.
 */
export interface IGuiPainter extends CanvasTextDrawingStyles, CanvasText, CanvasState, CanvasShadowStyles, CanvasPathDrawingStyles, CanvasFillStrokeStyles {
  /** Returns the size of the screen */
  getSize(): Vec2d;
  stroke(path: Path2D): void;
  fill(path: Path2D): void;

  clipPaint(region: Path2D, paintFunc: PaintFunc): void;
}
