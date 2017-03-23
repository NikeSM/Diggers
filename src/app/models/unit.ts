import { generateId } from '../../utils';
import { Vector } from '../models/math-models/vector';
import { Sprite } from './animation/sprite';
import { direction } from './math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  max_speed?: number
  min_speed?: number
}

export class Unit {
  private id: string;
  private name: string;
  private position: Vector;
  private speed: Vector;
  private sprite: Sprite;
  private accelerate: number;
  private size: Vector;
  private max_speed: number;
  private min_speed: number;
  private direction: Vector;

  constructor(options: unitOptions) {
    this.id = generateId();
    this.name = options.name || '';
    this.sprite = options.sprite;
    this.position = options.position || new Vector(0, 0);
    this.accelerate = 0.5;
    this.size = options.size || new Vector(100, 100);
    this.max_speed = options.max_speed || 50;
    this.min_speed = options.min_speed || 15;
    this.direction = direction.RIGHT;
    this.speed = this.direction;
  }

  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getPosition(): Vector { return this.position; }
  public getSpeed(): Vector { return this.speed; }
  public getDrawPoint(): Vector {
    return new Vector(-this.size.x / 2, -this.size.y / 2);
  }

  // public deleteUnit (callback: Function): void {
  //   callback();
  //   delete this;
  // }

  public update(deltaTime: number): void {
    console.log('position', this.position);
    this.position = this.position.add(this.speed.multiply(deltaTime));
    this.speed = this.speed.increase(this.accelerate);
    this.speed = this.speed.length() < this.max_speed ? this.speed : this.speed.setLength(this.max_speed);
    this.sprite.update(deltaTime);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.size);
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
    this.accelerate = Math.abs(this.accelerate);
    this.speed = this.speed.isNullVector() ? this.direction : this.speed;
  }

  public back(): void {
    this.accelerate = -Math.abs(this.accelerate);
  }

  public getDirection(): Vector {
    return this.direction;
  }
}
