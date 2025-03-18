export class Vec2d {
  constructor(
    public x: number,
    public y: number
  ) { }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
