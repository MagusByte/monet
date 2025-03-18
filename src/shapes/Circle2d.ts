/**
 * Represents a 2D circle with a center point and a radius.
 */
export class Circle2d {
  /**
   * Creates an instance of Circle2d.
   * 
   * @param x - The x-coordinate of the circle's center.
   * @param y - The y-coordinate of the circle's center.
   * @param radius - The radius of the circle.
   */
  constructor(
    public x: number,
    public y: number,
    public radius: number) { }

    /**
     * Determines if a given point is inside the circle.
     * 
     * @param x - The x-coordinate of the point.
     * @param y - The y-coordinate of the point.
     * @returns True if the point is inside the circle, otherwise false.
     */
    isInside(x: number, y: number): boolean {
      const dx = x - this.x;
      const dy = y - this.y;
      return (dx * dx + dy * dy) <= (this.radius * this.radius);
    }
  
}
