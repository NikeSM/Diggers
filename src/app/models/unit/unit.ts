import { utils } from '../../../utils';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';
import { direction } from '../math-models/direction';
import { Game } from '../../game/game';
import { Map } from '../../game/map/map';
import { GameState } from '../../game/game-state/game-state';

export enum shapeType {
  CIRCLE,
  RECTANGLE
}

export type unitOptions = {
  game: Game;
  sprite: Sprite;
  shape: shapeType;
  name: string;
  position: Vector;
  max_speed: number
  min_speed: number
  accelerate_module: number;
  radius: number;
  size: Vector;
}

export let defaultUnitOptions: unitOptions = {
  game: null,
  sprite: null,
  name: '',
  position: new Vector(0, 0),
  accelerate_module: 0,
  max_speed: 0,
  min_speed: 0,
  shape: shapeType.RECTANGLE,
  size: new Vector(50, 50),
  radius: 50
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
  private _radius: number;
  private _size: Vector;
  private _shape: shapeType;
  private _game: Game;
  private _map: Map;
  private _gameState: GameState;

  constructor(options: unitOptions) {
    let mergedOptions = utils.merge([defaultUnitOptions, options]);
    this.id = utils.generateId();
    this.name = mergedOptions.name;
    this.sprite = mergedOptions.sprite;
    this.position = mergedOptions.position;
    this.accelerate_module = mergedOptions.accelerate_module;
    this.max_speed = mergedOptions.max_speed;
    this.min_speed = mergedOptions.min_speed;
    this.radius = mergedOptions.radius;
    this.size = mergedOptions.size;
    this.shape = mergedOptions.shape;
    this._game = mergedOptions.game;

    this._map = this._game.map;
    this._gameState = this._game.gameState;
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
    this.sprite.render(context, this.getDrawPoint(), this.getRectangleSize());
  }

  public getDrawPoint(): Vector {
    switch (this.shape) {
      case shapeType.CIRCLE:
        return new Vector(-this.radius, -this.radius);
      case shapeType.RECTANGLE:
        return new Vector(-this.size.x / 2, -this.size.y / 2);
      default:
        return new Vector(0, 0);
    }
  }

  public getRectangleSize(): Vector {
    switch (this.shape) {
      case shapeType.CIRCLE:
        return new Vector(this.radius * 2, this.radius * 2);
      case shapeType.RECTANGLE:
        return this.size;
      default:
        return new Vector(0, 0);
    }
  }

  public getCircleSize(): number {
    switch (this.shape) {
      case shapeType.CIRCLE:
        return this.radius;
      case shapeType.RECTANGLE:
        return utils.circumscribedCircleRadius(this.size);
      default:
        return 0;
    }
  }


  private get radius(): number {
    switch (this.shape) {
      case shapeType.CIRCLE:
        return this.radius;
      case shapeType.RECTANGLE:
        return utils.circumscribedCircleRadius(this.size);
      default:
        return 0;
    }
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
    if (this.direction && value.dot(this.direction) === 0) {
      this.size = new Vector(this.size.y, this.size.x);
    }
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

  private set radius(value: number) {
    this._radius = value;
  }

  private get size(): Vector {
    return this._size;
  }

  private set size(value: Vector) {
    this._size = value;
  }

  get shape(): shapeType {
    return this._shape;
  }

  set shape(value: shapeType) {
    this._shape = value;
  }

  get map(): Map {
    return this._map;
  }

  get game(): Game {
    return this._game;
  }

  get gameState(): GameState {
    return this._gameState;
  }
}