import { Vec2d } from "./Vec2d";

export class Line2d {
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
  ) { }

  getClosestPoint(x: number, y: number): Vec2d {
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;
    const lengthSquared = dx * dx + dy * dy;

    if (lengthSquared === 0) {
      return new Vec2d(0, 0); // Line is a point
    }

    const t = ((x - this.x1) * dx + (y - this.y1) * dy) / lengthSquared;
    const clampedT = Math.max(0, Math.min(1, t));

    return new Vec2d(
      this.x1 + clampedT * dx,
      this.y1 + clampedT * dy,
    );
  }

  getDistanceFrom(x: number, y: number): number {
    const nearestPoint = this.getClosestPoint(x, y);
    const dx = nearestPoint.x - x
    const dy = nearestPoint.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
