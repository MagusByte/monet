export class Vec2d {
  static get Zero() { return new Vec2d(0, 0); }
  static get One() { return new Vec2d(1, 1); }
  
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number);
  constructor(v: Vec2d);
  constructor(v: { x: number, y: number });

  constructor(
    v: number | Vec2d | { x: number, y: number },
    y?: number
  ) { 
    if(typeof v == 'object') {
      this.x = v.x;
      this.y = v.y;
    }else {
      this.x = v;
      this.y = y || 0;
    }
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getNormalized() {
    if (this.x == 0 && this.y == 0) return Vec2d.Zero;
    const length = this.length;
    return new Vec2d(this.x / length, this.y / length);
  }

  static Add(a: Vec2d, b: Vec2d): Vec2d {
    return new Vec2d(a.x + b.x, a.y + b.y);
  }

  static Subtract(a: Vec2d, b: Vec2d) {
    return new Vec2d(a.x - b.x, a.y - b.y);
  }

  static Multiply(a: Vec2d, b: Vec2d) {
    return new Vec2d(a.x * b.x, a.y * b.y);
  }

  static Scale(a: Vec2d, m: number) {
    return new Vec2d(a.x * m, a.y * m);
  }
}
