import { generateId } from '../../utils';
import { Vector } from '../models/math-models/vector';
import { Sprite } from './animation/sprite';

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
  private accelerate: Vector;

  constructor(options: unitOptions) {
    this.id = generateId();
    this.name = options.name || '';
    this.sprite = options.sprite;
    this.position = options.position || new Vector(0, 0);
    this.speed = new Vector(0,0);
    this.accelerate = new Vector(0,0);
  }

  public getId(): string {return this.id}
  public getName(): string {return this.name}
  public getPosition(): Vector {return this.position}
  public getSpeed(): Vector {return this.speed}


  public deleteUnit (callback: Function) {
    callback();
    delete this;
  }

  public update(deltaTime: number): void {
    this.position = this.position.add(this.speed.multiply(deltaTime));
    this.speed = this.speed.add(this.accelerate.multiply(deltaTime));
    this.sprite.update(deltaTime);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context)
  }

  public changeAcceleration(vector: Vector):void {
    this.accelerate = vector;
  }
}
