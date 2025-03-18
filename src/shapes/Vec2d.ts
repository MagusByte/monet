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
    return new Vec2d(this.x, this.y);
  }
}
