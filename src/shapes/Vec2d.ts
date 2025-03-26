/**
 * Represents a 2D vector with x and y components.
 */
export class Vec2d {
  /**
   * A static property that returns a vector with both x and y set to 0.
   */
  static get Zero() { return new Vec2d(0, 0); }

  /**
   * A static property that returns a vector with both x and y set to 1.
   */
  static get One() { return new Vec2d(1, 1); }

  /**
   * The x component of the vector.
   */
  public x: number = 0;

  /**
   * The y component of the vector.
   */
  public y: number = 0;

  /**
   * Creates a new Vec2d instance.
   * 
   * @param x - The x component of the vector.
   * @param y - The y component of the vector.
   */
  constructor(x: number, y: number);

  /**
   * Creates a new Vec2d instance by copying another Vec2d.
   * 
   * @param v - The vector to copy.
   */
  constructor(v: Vec2d);

  /**
   * Creates a new Vec2d instance from an object with x and y properties.
   * 
   * @param v - An object containing x and y properties.
   */
  constructor(v: { x: number, y: number });

  /**
   * Creates a new Vec2d instance.
   * 
   * @param v - Either a number, a Vec2d, or an object with x and y properties.
   * @param y - The y component of the vector (if v is a number).
   */
  constructor(
    v: number | Vec2d | { x: number, y: number },
    y?: number
  ) {
    if (typeof v == 'object') {
      this.x = v.x;
      this.y = v.y;
    } else {
      this.x = v;
      this.y = y || 0;
    }
  }

  /**
   * Gets the length (magnitude) of the vector.
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns a normalized version of the vector (a vector with the same direction but a length of 1).
   * If the vector is zero, returns Vec2d.Zero.
   */
  getNormalized() {
    if (this.x == 0 && this.y == 0) return Vec2d.Zero;
    const length = this.length;
    return new Vec2d(this.x / length, this.y / length);
  }

  /**
   * Adds two vectors and returns the result as a new Vec2d.
   * 
   * @param a - The first vector.
   * @param b - The second vector.
   * @returns A new Vec2d representing the sum of the two vectors.
   */
  static Add(a: Vec2d, b: Vec2d): Vec2d {
    return new Vec2d(a.x + b.x, a.y + b.y);
  }

  /**
   * Subtracts the second vector from the first and returns the result as a new Vec2d.
   * 
   * @param a - The vector to subtract from.
   * @param b - The vector to subtract.
   * @returns A new Vec2d representing the difference of the two vectors.
   */
  static Subtract(a: Vec2d, b: Vec2d) {
    return new Vec2d(a.x - b.x, a.y - b.y);
  }

  /**
   * Multiplies two vectors component-wise and returns the result as a new Vec2d.
   * 
   * @param a - The first vector.
   * @param b - The second vector.
   * @returns A new Vec2d representing the component-wise product of the two vectors.
   */
  static Multiply(a: Vec2d, b: Vec2d) {
    return new Vec2d(a.x * b.x, a.y * b.y);
  }

  /**
   * Scales a vector by a scalar value and returns the result as a new Vec2d.
   * 
   * @param a - The vector to scale.
   * @param m - The scalar value to scale the vector by.
   * @returns A new Vec2d representing the scaled vector.
   */
  static Scale(a: Vec2d, m: number) {
    return new Vec2d(a.x * m, a.y * m);
  }
}
