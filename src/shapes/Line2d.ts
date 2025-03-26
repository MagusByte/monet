import { Vec2d } from "./Vec2d";

/**
 * Represents a 2D line segment defined by two endpoints (x1, y1) and (x2, y2).
 */
export class Line2d {
  /**
   * Creates a new Line2d instance.
   * @param x1 - The x-coordinate of the first endpoint.
   * @param y1 - The y-coordinate of the first endpoint.
   * @param x2 - The x-coordinate of the second endpoint.
   * @param y2 - The y-coordinate of the second endpoint.
   */
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
  ) { }

  /**
   * Finds the closest point on the line segment to a given point (x, y).
   * @param x - The x-coordinate of the point.
   * @param y - The y-coordinate of the point.
   * @returns A Vec2d instance representing the closest point on the line segment.
   */
  getClosestPoint(x: number, y: number): Vec2d {
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;
    const lengthSquared = dx * dx + dy * dy;

    if (lengthSquared === 0) {
      return new Vec2d(this.x1, this.y1); // Line is a point
    }

    const t = ((x - this.x1) * dx + (y - this.y1) * dy) / lengthSquared;
    const clampedT = Math.max(0, Math.min(1, t));

    return new Vec2d(
      this.x1 + clampedT * dx,
      this.y1 + clampedT * dy,
    );
  }

  /**
   * Calculates the shortest distance from a given point (x, y) to the line segment.
   * @param x - The x-coordinate of the point.
   * @param y - The y-coordinate of the point.
   * @returns The shortest distance from the point to the line segment.
   */
  getDistanceFrom(x: number, y: number): number {
    const nearestPoint = this.getClosestPoint(x, y);
    const dx = nearestPoint.x - x
    const dy = nearestPoint.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
