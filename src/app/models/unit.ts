import { generateId } from '../../utils';
import { Vector } from './math-models/vector';
import { Sprite } from './animation/sprite';
import { direction } from './math-models/direction';
import { CollisionChecker } from '../collisions/check-collisions';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  max_speed?: number
  min_speed?: number
  accelerate?: number;
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
    this.accelerate = options.accelerate || 0;
    this.size = options.size || new Vector(50, 50);
    this.max_speed = options.max_speed || 0;
    this.min_speed = options.min_speed || 0;
    this.setDirection(direction.RIGHT);
    this.setSpeed(this.getDirection());
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPosition(): Vector {
    return this.position;
  }

  public getSize(): Vector {
    return this.size;
  }

  public getSpeed(): Vector {
    return this.speed;
  }

  public getDrawPoint(): Vector {
    return new Vector(-this.size.x / 2, -this.size.y / 2);
  }

  // public deleteUnit (callback: Function): void {
  //   callback();
  //   delete this;
  // }

  public update(deltaTime: number): void {
    let newPosition = this.position.add(this.getSpeed().multiply(deltaTime));
    if (!CollisionChecker.collisionWithStatic(this, newPosition)) {
      this.position = newPosition;
      this.setSpeed(this.getSpeed().increase(this.accelerate * deltaTime));
      this.setSpeed(
        this.getSpeed().length() < this.max_speed ? this.getSpeed() : this.getSpeed().setLength(this.max_speed)
      );
    }
    this.sprite.update(deltaTime);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.size);
  }

  public rotate(direction: Vector): void {
    if (this.getDirection() === direction) {
      this.forward();
    } else {
      if (this.getDirection().dot(direction)) {
        this.back();
      } else {
        this.setDirection(direction);
        this.setSpeed(this.getDirection().setLength(this.min_speed));
      }
    }
  }

  public rotateLeft(): void {
    this.setDirection(new Vector(this.getDirection().y, -this.getDirection().x));
    this.setSpeed(this.getDirection().setLength(this.min_speed));
  }

  public rotateRight(): void {
    this.setDirection(new Vector(-this.getDirection().y, this.getDirection().x));
    this.setSpeed(this.getDirection().setLength(this.min_speed));
  }

  public forward(): void {
    this.accelerate = Math.abs(this.accelerate);
    this.setSpeed(this.getSpeed().isNullVector() ? this.getDirection() : this.getSpeed());
  }

  public back(): void {
    this.accelerate = -Math.abs(this.accelerate);
  }

  public getDirection(): Vector {
    return this.direction;
  }

  public stop(): void {
    this.setSpeed(new Vector(0, 0));
    // this.accelerate = 0;
  }

  private setSpeed(speed: Vector): void {
    this.speed = speed;
  }

  private setDirection(direction: Vector): void {
    this.direction = direction;
  }
}
