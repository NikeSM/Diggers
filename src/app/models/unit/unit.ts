import { utils } from '../../../utils';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';
import { direction } from '../math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  max_speed?: number
  min_speed?: number
  accelerate_module?: number;
}
let defaultUnitOptions: unitOptions = {
  sprite: null,
  name: '',
  position: new Vector(0, 0),
  accelerate_module: 0,
  max_speed: 0,
  min_speed: 0
};
export class Unit {
  private _id: string;
  private _name: string;
  private _position: Vector;
  private _speed: Vector;
  private _sprite: Sprite;
  private _accelerate: Vector;
  private _max_speed: number;
  private _min_speed: number;
  private _direction: Vector;
  private _accelerate_module: number;

  constructor(options: unitOptions) {
    let mergedOptions = utils.merge([defaultUnitOptions, options]);
    this.id = utils.generateId();
    this.name = mergedOptions.name;
    this.sprite = mergedOptions.sprite;
    this.position = mergedOptions.position;
    this.accelerate_module = mergedOptions.accelerate_module;
    this.max_speed = mergedOptions.max_speed;
    this.min_speed = mergedOptions.min_speed;

    this.accelerate = new Vector(0, 0);
    this.direction = direction.RIGHT;
    this.speed = this.direction;
  }
  // public deleteUnit (callback: Function): void {
  //   callback();
  //   delete this;
  // }

  public update(deltaTime: number): void {
    this.position = this.getNewPosition(deltaTime);
    this.speed = this.speed.add(this.accelerate.multiply(deltaTime));
    this.speed = this.speed.length() < this.max_speed ? this.speed : this.speed.setLength(this.max_speed);
    this._sprite.update(deltaTime);
  }

  public getNewPosition(deltaTime: number): Vector {
    return this.position.add(this.speed.multiply(deltaTime));
  }

  public rotate(direction: Vector): void {
    if (this.direction === direction) {
      this.forward();
    } else {
      if (this.direction.dot(direction)) {
        this.back();
      } else {
        this.direction = direction;
        this.speed = this.direction.setLength(this.min_speed);
      }
    }
  }

  public rotateLeft(): void {
    this.direction = new Vector(this.direction.y, -this.direction.x);
    this.speed = this.direction.setLength(this.min_speed);
  }

  public rotateRight(): void {
    this.direction = new Vector(-this.direction.y, this.direction.x);
    this.speed = this.direction.setLength(this.min_speed);
  }

  public forward(): void {
    this.accelerate = this.direction.multiply(this.accelerate_module);
    this.speed =
      this.speed.isNullVector() || this.speed.dot(this.direction) < 0 ?
        this.direction :
        this.speed;
  }

  public back(): void {
    this.accelerate = this.direction.multiply(-this.accelerate_module);
    if (this.speed.isNullVector()) {
      this.speed = this.direction.multiply(-1);
    }
  }

  public stop(): void {
    this.speed = new Vector(0, 0);
    this.accelerate = new Vector(0, 0);
  }

  public render(context: CanvasRenderingContext2D): void {
    console.error('Must overrides in children');
  }

  get accelerate_module(): number {
    return this._accelerate_module;
  }

  set accelerate_module(value: number) {
    this._accelerate_module = value;
  }
  get direction(): Vector {
    return this._direction;
  }

  set direction(value: Vector) {
    this._direction = value;
  }
  get sprite(): Sprite {
    return this._sprite;
  }

  set sprite(value: Sprite) {
    this._sprite = value;
  }
  get min_speed(): number {
    return this._min_speed;
  }

  set min_speed(value: number) {
    this._min_speed = value;
  }
  get max_speed(): number {
    return this._max_speed;
  }

  set max_speed(value: number) {
    this._max_speed = value;
  }
  get accelerate(): Vector {
    return this._accelerate;
  }

  set accelerate(value: Vector) {
    this._accelerate = value;
  }
  get speed(): Vector {
    return this._speed;
  }

  set speed(value: Vector) {
    this._speed = value;
  }
  get position(): Vector {
    return this._position;
  }

  set position(value: Vector) {
    this._position = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
