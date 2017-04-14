import { generateId } from '../../utils';
import { Vector } from './math-models/vector';
import { Sprite } from './animation/sprite';
import { direction } from './math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  max_speed?: number
  min_speed?: number
  accelerate_module?: number;
}

export class Unit {
  private id: string;
  private name: string;
  private position: Vector;
  private speed: Vector;
  private sprite: Sprite;
  private accelerate: Vector;
  private size: Vector;
  private max_speed: number;
  private min_speed: number;
  private direction: Vector;
  private accelerate_module: number;

  constructor(options: unitOptions) {
    this.id = generateId();
    this.name = options.name || '';
    this.sprite = options.sprite;
    this.setPosition(options.position || new Vector(0, 0));
    this.setAccelerate(new Vector(0, 0));
    this.accelerate_module = options.accelerate_module || 0;
    this.setSize(options.size || new Vector(50, 50));
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
    return new Vector(-this.getSize().x / 2, -this.getSize().y / 2);
  }

  // public deleteUnit (callback: Function): void {
  //   callback();
  //   delete this;
  // }

  public update(deltaTime: number): void {
    this.setPosition(this.getNewPosition(deltaTime));
    this.setSpeed(this.getSpeed().add(this.getAccelerate().multiply(deltaTime)));
    this.setSpeed(
      this.getSpeed().length() < this.max_speed ? this.getSpeed() : this.getSpeed().setLength(this.max_speed)
    );
    this.sprite.update(deltaTime);
  }

  public getNewPosition(deltaTime: number): Vector {
    return this.getPosition().add(this.getSpeed().multiply(deltaTime));
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.getSize());
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
    this.setAccelerate(this.getDirection().multiply(this.accelerate_module));
    this.setSpeed(
      this.getSpeed().isNullVector() || this.getSpeed().dot(this.getDirection()) < 0 ?
        this.getDirection() :
        this.getSpeed());
  }

  public back(): void {
    this.setAccelerate(this.getDirection().multiply(-this.accelerate_module));
    if (this.getSpeed().isNullVector()) {
      this.setSpeed(this.getDirection().multiply(-1));
    }
  }

  public getDirection(): Vector {
    return this.direction;
  }

  public stop(): void {
    this.setSpeed(new Vector(0, 0));
    this.setAccelerate(new Vector(0, 0));
  }

  private setSpeed(speed: Vector): void {
    this.speed = speed;
  }

  private setAccelerate(accelerate: Vector): void {
    this.accelerate = accelerate;
  }

  private getAccelerate(): Vector {
    return this.accelerate;
  }

  private setDirection(direction: Vector): void {
    this.direction = direction;
  }

  private setPosition(position: Vector): void {
    this.position = position;
  }

  private setSize(size: Vector): void {
    this.size = size;
  }
}
