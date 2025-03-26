/**
 * Represents a 2D quadrilateral defined by two diagonal corner points.
 */
export class Quad2d {
  /**
   * Creates an instance of Quad2d.
   * @param x1 - The x-coordinate of the first corner.
   * @param y1 - The y-coordinate of the first corner.
   * @param x2 - The x-coordinate of the opposite corner.
   * @param y2 - The y-coordinate of the opposite corner.
   */
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
  ) { }

  /**
   * Determines if a given point (x, y) is inside the quadrilateral.
   * @param x - The x-coordinate of the point to check.
   * @param y - The y-coordinate of the point to check.
   * @returns `true` if the point is inside the quadrilateral, otherwise `false`.
   */
  isInside(x: number, y: number): boolean {
    if (x < this.minX || x > this.maxX) return false;
    if (y < this.minY || y > this.maxY) return false;

    return true;
  }

  /**
   * Gets the minimum x-coordinate of the quadrilateral.
   */
  get minX() { return Math.min(this.x1, this.x2); }

  /**
   * Gets the maximum x-coordinate of the quadrilateral.
   */
  get maxX() { return Math.max(this.x1, this.x2); }

  /**
   * Gets the minimum y-coordinate of the quadrilateral.
   */
  get minY() { return Math.min(this.y1, this.y2); }

  /**
   * Gets the maximum y-coordinate of the quadrilateral.
   */
  get maxY() { return Math.max(this.y1, this.y2); }
}
