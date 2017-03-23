export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  public negative(): Vector {
    return new Vector(-this.x, -this.y);
  }

  public add(v: Vector | number): Vector {
    return (v instanceof Vector) ?
      new Vector(this.x + v.x, this.y + v.y) :
      new Vector(this.x + v, this.y + v);
  }

  public subtract(v: Vector | number): Vector {
    return (v instanceof Vector) ?
      new Vector(this.x - v.x, this.y - v.y) :
      new Vector(this.x - v, this.y - v);
  }

  public multiply(v: Vector | number): Vector {
    return (v instanceof Vector) ?
      new Vector(this.x * v.x, this.y * v.y) :
      new Vector(this.x * v, this.y * v);
  }

  public divide(v: Vector | number): Vector {
    return (v instanceof Vector) ?
      new Vector(this.x / v.x, this.y / v.y) :
      new Vector(this.x / v, this.y / v);
  }

  public equals(v: Vector): boolean {
    return this.x === v.x && this.y === v.y ;
  }

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  // public cross(v) {
  //   return new Vector(
  //     this.y * v.z - this.z * v.y,
  //     this.z * v.x - this.x * v.z,
  //     this.x * v.y - this.y * v.x);
  // }

  public length(): number {
    return Math.sqrt(this.dot(this));
  }

  public unit(): Vector {
    return this.divide(this.length());
  }

  public min(): number {
    return Math.min(this.x, this.y);
  }

  public max(): number {
    return Math.max(this.x, this.y);
  }

  // public toAngles() {
  //   return {
  //     theta: Math.atan2(this.z, this.x),
  //     phi: Math.asin(this.y / this.length())
  //   };
  // }

  public angleTo(a: Vector): number {
    return Math.atan2(this.y - a.y, this.x - a.y);
  }

  public toArray(n: number): Array<number> {
    return [this.x, this.y].slice(0, n || 2);
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public init(x: number, y: number): Vector {
    this.x = x; this.y = y;
    return this;
  }

  public increase(n: number): Vector {
    let length = this.length();
    return this.setLength(length + n);
  }

  public setLength(l: number): Vector {
    return this.clone().unit().multiply(l);
  }

  public isNullVector(): boolean {
    return this.equals(new Vector(0, 0));
  }
}
