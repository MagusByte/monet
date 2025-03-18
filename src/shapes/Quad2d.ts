export class Quad2d {
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
  ) { }

  isInside(x: number, y: number): boolean {
    if (x < this.minX || x > this.maxX) return false;
    if (y < this.minY || y > this.maxY) return false;

    return true;
  }

  isOutside(x: number, y: number): boolean {
    return !this.isInside(x, y);
  }

  get minX() { return Math.min(this.x1, this.x2); }
  get maxX() { return Math.max(this.x1, this.x2); }
  get minY() { return Math.min(this.y1, this.y2); }
  get maxY() { return Math.max(this.y1, this.y2); }
}
