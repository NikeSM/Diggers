import { generateId } from '../../utils';
import { Vector } from '../models/math-models/vector';
import { Sprite } from './animation/sprite';
import { direction } from './math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
}

export class Unit {
  private id: string;
  private name: string;
  private position: Vector;
  private speed: Vector;
  private sprite: Sprite;
  private accelerate: number;
  private direction: Vector;
  private size: Vector;

  constructor(options: unitOptions) {
    this.id = generateId();
    this.name = options.name || '';
    this.sprite = options.sprite;
    this.position = options.position || new Vector(0, 0);
    this.speed = new Vector(0, 0);
    this.accelerate = 0.5;
    this.direction = direction.RIGHT;
    this.size = options.size || new Vector(100, 100);
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
    this.speed = this.speed.add(this.direction.multiply(this.accelerate));
    this.sprite.update(deltaTime);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint());
  }

  public rotate(direction: Vector): void {
    if (this.direction !== direction) {
      console.log('rotate');
      this.direction = direction;
      this.speed = direction.multiply(this.speed);
    }
  }
}
