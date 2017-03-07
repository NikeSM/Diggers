import { generateId } from '../../utils';
import { Vector } from '../models/math-models/vector';
import { Sprite } from './animation/sprite';
import { direction } from './math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
}

export class Unit {
  private id: string;
  private name: string;
  private position: Vector;
  private speed: Vector;
  private sprite: Sprite;
  private accelerate: number;
  private direction: Vector;

  constructor(options: unitOptions) {
    this.id = generateId();
    this.name = options.name || '';
    this.sprite = options.sprite;
    this.position = options.position || new Vector(0, 0);
    this.speed = new Vector(0, 0);
    this.accelerate = 5;
    this.direction = direction.RIGHT;
  }

  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getPosition(): Vector { return this.position; }
  public getSpeed(): Vector { return this.speed; }


  public deleteUnit (callback: Function): void {
    callback();
    delete this;
  }

  public update(deltaTime: number): void {
    this.position = this.position.add(this.speed.multiply(deltaTime));
    this.speed = this.speed.add(this.direction.multiply(this.accelerate));
    this.sprite.update(deltaTime);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context);
  }

  public rotate(direction: Vector): void {
    if (this.direction !== direction) {
      this.direction = direction;
      this.speed = direction.multiply(this.speed).multiply(0.3);
    }
  }
}
