import { utils } from '../../../utils';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';
import { Direction } from '../math-models/direction';

export type unitOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  direction?: Vector;
  max_speed?: number
  min_speed?: number
  accelerate_module?: number;
  size?: Vector;
  immortal?: boolean;
  health?: number;
  underGroundSpeed?: number;
}

export let defaultUnitOptions: unitOptions = {
  sprite: null,
  name: '',
  position: new Vector(0, 0),
  direction: Direction.RIGHT,
  accelerate_module: 0,
  max_speed: 0,
  min_speed: 0,
  size: new Vector(50, 50),
  immortal: false,
  health: 100,
  underGroundSpeed: 0
};

export type unitPoints = {
  leftUp: Vector;
  rightDown: Vector;
}

export let mergeUnitOptions = (opt_1: unitOptions, opt_2: unitOptions): unitOptions => {
  let position = opt_2.position || opt_1.position || new Vector(0, 0);
  let size = opt_2.size || opt_1.size || new Vector(50, 50);
  return {
    name: opt_2.name || opt_1.name || 'Unit',
    sprite: opt_2.sprite || opt_1.sprite || null,
    direction: opt_2.direction || opt_1.direction || Direction.RIGHT,
    position: position.clone(),
    accelerate_module: opt_2.accelerate_module || opt_1.accelerate_module || 0,
    max_speed: opt_2.max_speed || opt_1.min_speed || 0,
    min_speed: opt_2.min_speed || opt_1.min_speed || 0,
    size: size.clone(),
    immortal: opt_2.immortal || opt_1.immortal || false,
    health: opt_2.health || opt_1.health || 100,
    underGroundSpeed: opt_2.underGroundSpeed || opt_1.underGroundSpeed || 0
  };
};

export class Unit implements IUnit {
  private id: string;
  private name: string;
  private position: Vector;
  private speed: Vector;
  private sprite: Sprite;
  private accelerate: Vector;
  private max_speed: number;
  private min_speed: number;
  private direction: Vector;
  private accelerate_module: number;
  private size: Vector;
  private immortal: boolean;
  private health: number;
  private underGroundSpeed: number;

  constructor(options: unitOptions) {
    let mergedOptions = mergeUnitOptions(defaultUnitOptions, options);
    this.id = utils.generateId();
    this.name = mergedOptions.name;
    this.sprite = mergedOptions.sprite;
    this.accelerate_module = mergedOptions.accelerate_module;
    this.max_speed = mergedOptions.max_speed;
    this.min_speed = mergedOptions.min_speed;
    this.size = mergedOptions.size;
    this.direction = mergedOptions.direction;
    this.immortal = mergedOptions.immortal;
    this.health = mergedOptions.health;
    this.position = mergedOptions.position;
    this.underGroundSpeed = mergedOptions.underGroundSpeed;

    this.accelerate = new Vector(0, 0);
    this.setSpeed(this.direction);
  }


  public update(deltaTime: number): void {
    this.setPosition(this.getNewPosition(deltaTime));
    this.setSpeed(this.speed.add(this.accelerate.multiply(deltaTime)));
    this.sprite.update(deltaTime);
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
        this.setDirection(direction);
        this.setSpeed(this.direction.setLength(this.min_speed));
      }
    }
  }

  public rotateLeft(): void {
    this.setDirection(new Vector(this.direction.y, -this.direction.x));
    this.setSpeed(this.direction.setLength(this.min_speed));
  }

  public rotateRight(): void {
    this.setDirection(new Vector(-this.direction.y, this.direction.x));
    this.setSpeed(this.direction.setLength(this.min_speed));
  }

  public forward(): void {
    this.accelerate = this.direction.multiply(this.accelerate_module);
    this.setSpeed(
      this.speed.isNullVector() || this.speed.dot(this.direction) < 0 ?
        this.direction :
        this.speed
    );
  }

  public back(): void {
    this.accelerate = this.direction.multiply(-this.accelerate_module);
    if (this.speed.isNullVector()) {
      this.setSpeed(this.direction.multiply(-1));
    }
  }

  // distance - расстояние до останаовки
  public stop(distance: number): void {
    this.setSpeed(new Vector(0, 0));
    this.accelerate = new Vector(0, 0);
    this.setPosition(this.position.add(this.direction.multiply(distance)));
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.getRectangleSize());
  }

  public getDrawPoint(): Vector {
    return new Vector(-this.size.x / 2, -this.size.y / 2);
  }

  public getRectangleSize(): Vector {
    return this.size;
  }

  public attacked(damage: number): void {
    if (!this.immortal) {
      this.health = this.health = damage;
    }
  }

  public setDirection(value: Vector): void {
    if (this.direction && -value.dot(this.direction) === 0) {
      this.size = new Vector(this.size.y, this.size.x);
    }
    this.direction = value;
  }

  public setSpeed(value: Vector): void {
    let speed = value.length() < this.max_speed ? value : value.setLength(this.max_speed);
    speed = speed.length() > this.min_speed ? speed : speed.setLength(this.min_speed);
    this.speed = speed;
  }

  public getId(): string {
    return this.id;
  }

  public getPosition(): Vector {
    return this.position;
  }

  public getDirection(): Vector {
    return this.direction;
  }

  public groundCollision(): void {
    this.speed.length() > this.underGroundSpeed && this.setSpeed(this.speed.setLength(this.underGroundSpeed));
  }

  public getUnitPoints(): unitPoints {
    return {
      leftUp: new Vector(this.getPosition().x - this.getRectangleSize().x / 2,
                         this.getPosition().y - this.getRectangleSize().y / 2),
      rightDown: new Vector(this.getPosition().x + this.getRectangleSize().x / 2,
                            this.getPosition().y + this.getRectangleSize().y / 2)
    };
  }

  private setPosition(position: Vector): void {
    this.position = position;
  }
}

export interface IUnit {
  render(context: CanvasRenderingContext2D): void;
  update(deltaTime: number): void;
  rotate(direction: Vector): void;
  rotateLeft(): void;
  rotateRight(): void;
  forward(): void;
  back(): void;
  stop(distance: number): void;
  attacked(damage: number): void;
  groundCollision(): void;

  setDirection(value: Vector): void;
  setSpeed(value: Vector): void;

  getDrawPoint(): Vector;
  getRectangleSize(): Vector;
  getId(): string;
  getPosition(): Vector;
  getDirection(): Vector;
  getNewPosition(deltaTime: number): Vector;
  getUnitPoints(): unitPoints;
}
