import { utils } from '../../utils';
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
let defaulUnitOptions: unitOptions = {
  sprite: null,
  name: '',
  position: new Vector(0, 0),
  accelerate_module: 0,
  max_speed: 0,
  min_speed: 0,
  size: new Vector(50, 50)
};
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
    let mergedOptions = utils.merge([options, defaulUnitOptions]);
    this.setId(utils.generateId());
    this.setName(mergedOptions.name);
    this.setSprite(mergedOptions.sprite);
    this.setPosition(mergedOptions.position);
    this.setAccelerateModule(mergedOptions.accelerate_module);
    this.setSize(mergedOptions.size);
    this.setMaxSpeed(mergedOptions.max_speed);
    this.setMinSpeed(mergedOptions.min_speed);

    this.setAccelerate(new Vector(0, 0));
    this.setDirection(direction.RIGHT);
    this.setSpeed(this.getDirection());
  }
  // public deleteUnit (callback: Function): void {
  //   callback();
  //   delete this;
  // }

  public update(deltaTime: number): void {
    this.setPosition(this.getNewPosition(deltaTime));
    this.setSpeed(this.getSpeed().add(this.getAccelerate().multiply(deltaTime)));
    this.setSpeed(
      this.getSpeed().length() < this.getMaxSpeed() ? this.getSpeed() : this.getSpeed().setLength(this.getMaxSpeed())
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
        this.setSpeed(this.getDirection().setLength(this.getMinSpeed()));
      }
    }
  }

  public rotateLeft(): void {
    this.setDirection(new Vector(this.getDirection().y, -this.getDirection().x));
    this.setSpeed(this.getDirection().setLength(this.getMinSpeed()));
  }

  public rotateRight(): void {
    this.setDirection(new Vector(-this.getDirection().y, this.getDirection().x));
    this.setSpeed(this.getDirection().setLength(this.getMinSpeed()));
  }

  public forward(): void {
    this.setAccelerate(this.getDirection().multiply(this.getAccelerateModule()));
    this.setSpeed(
      this.getSpeed().isNullVector() || this.getSpeed().dot(this.getDirection()) < 0 ?
        this.getDirection() :
        this.getSpeed());
  }

  public back(): void {
    this.setAccelerate(this.getDirection().multiply(-this.getAccelerateModule()));
    if (this.getSpeed().isNullVector()) {
      this.setSpeed(this.getDirection().multiply(-1));
    }
  }

  public stop(): void {
    this.setSpeed(new Vector(0, 0));
    this.setAccelerate(new Vector(0, 0));
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

  public getDirection(): Vector {
    return this.direction;
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

  private getMaxSpeed(): number {
    return this.max_speed;
  }

  private setMaxSpeed(maxSpeed: number): void {
    this.max_speed = maxSpeed;
  }

  private getMinSpeed(): number {
    return this.min_speed;
  }

  private setMinSpeed(minSpeed: number): void {
    this.min_speed = minSpeed;
  }

  private getSprite(): Sprite {
    return this.sprite;
  }

  private setSprite(sprite: Sprite): void {
    this.sprite = sprite;
  }

  private setId(id: string): void {
    this.id = id;
  }

  private setName(name: string): void {
    this.name = name;
  }

  private setAccelerateModule(accelerateModule: number): void {
    this.accelerate_module = accelerateModule;
  }

  private getAccelerateModule(): number {
    return this.accelerate_module;
  }
}
