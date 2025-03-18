export class Vec2d {
  static get Zero() { return new Vec2d(0, 0); }
  
  constructor(
    public x: number,
    public y: number
  ) { }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }


  getNormalized() {
    if(this.x == 0 && this.y == 0) return Vec2d.Zero;
    const length = this.length;
    return new Vec2d(this.x / length, this.y / length);
  }
}
