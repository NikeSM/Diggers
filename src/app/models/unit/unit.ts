import { utils } from '../../../utils';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';
import { Direction } from '../math-models/direction';
import { Game } from '../../game/game';
import { Map } from '../../game/map/map';
import { GameState } from '../../game/game-state/game-state';

// export enum shapeType {
//   CIRCLE,
//   RECTANGLE
// }

export type unitOptions = {
  game: Game;
  sprite: Sprite;
  // shape?: shapeType;
  name?: string;
  position?: Vector;
  direction?: Vector;
  max_speed?: number
  min_speed?: number
  accelerate_module?: number;
  size?: Vector;
  immortal?: boolean;
  health?: number
  // radius?: number;
}

export let defaultUnitOptions: unitOptions = {
  game: null,
  sprite: null,
  name: '',
  position: new Vector(0, 0),
  direction: Direction.RIGHT,
  accelerate_module: 0,
  max_speed: 0,
  min_speed: 0,
  // shape: shapeType.RECTANGLE,
  size: new Vector(50, 50),
  immortal: false,
  health: 100
  // radius: 25
};
export class Unit {
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
  private game: Game;
  private map: Map;
  private gameState: GameState;
  private immortal: boolean;
  private health: number;
  // private radius: number;
  // private shape: shapeType;

  constructor(options: unitOptions) {
    let mergedOptions = Unit.mergeUnitOptions(defaultUnitOptions, options);
    this.id = utils.generateId();
    this.name = mergedOptions.name;
    this.sprite = mergedOptions.sprite;
    this.position = mergedOptions.position;
    this.accelerate_module = mergedOptions.accelerate_module;
    this.max_speed = mergedOptions.max_speed;
    this.min_speed = mergedOptions.min_speed;
    this.size = mergedOptions.size;
    this.game = mergedOptions.game;
    this.direction = mergedOptions.direction;
    this.immortal = mergedOptions.immortal;
    this.health = mergedOptions.health;
    // this.radius = mergedOptions.radius;
    // this.shape = mergedOptions.shape;

    this.map = this.game.getMap();
    this.gameState = this.game.getGameState();
    this.accelerate = new Vector(0, 0);
    this.setSpeed(this.direction);
  }


  public update(deltaTime: number): void {
    this.position = this.getNewPosition(deltaTime);
    this.setSpeed(this.speed.add(this.accelerate.multiply(deltaTime)));
    this.sprite.update(deltaTime);
  }

  public getNewPosition(deltaTime: number): Vector {
    return this.position.add(this.speed.multiply(deltaTime));
  }

  public deleteUnit (): void {
    this.gameState.deleteUnit(this);
    this.game.getMap().getPositionMap().deleteUnitPositionMap(this);
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

  public stop(): void {
    this.setSpeed(new Vector(0, 0));
    this.accelerate = new Vector(0, 0);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.getRectangleSize());
  }

  public getDrawPoint(): Vector {
    // switch (this.shape) {
    //   case shapeType.CIRCLE:
    //     return new Vector(-this.getRadius(), -this.getRadius());
    //   case shapeType.RECTANGLE:
        return new Vector(-this.size.x / 2, -this.size.y / 2);
    //   default:
    //     return new Vector(0, 0);
    // }
  }

  public getRectangleSize(): Vector {
    // switch (this.shape) {
    //   case shapeType.CIRCLE:
    //     return new Vector(this.getRadius() * 2, this.getRadius() * 2);
    //   case shapeType.RECTANGLE:
        return this.size;
    //   default:
    //     return new Vector(0, 0);
    // }
  }

  public getCircleSize(): number {
    // switch (this.shape) {
    //   case shapeType.CIRCLE:
    //     return this.getRadius();
    //   case shapeType.RECTANGLE:
        return utils.circumscribedCircleRadius(this.size);
    //   default:
    //     return 0;
    // }
  }

  public destroyUnit(): void {
    this.gameState.deleteUnit(this);
  }

  public attacked(damage: number): void {
    if (!this.immortal) {
      this.health = this.health = damage;
      if (this.health <= 0) {
        this.destroyUnit();
      }
    }
  }

  public static mergeUnitOptions(opt_1: unitOptions, opt_2: unitOptions): unitOptions {
    let position = opt_2.position || opt_1.position || new Vector(0, 0);
    let size = opt_2.size || opt_1.size || new Vector(50, 50);
    return {
      game:  opt_2.game || opt_1.game || null,
      name: opt_2.name || opt_1.name || 'Unit',
      sprite: opt_2.sprite || opt_1.sprite || null,
      direction: opt_2.direction || opt_1.direction || Direction.RIGHT,
      position: position.clone(),
      accelerate_module: opt_2.accelerate_module || opt_1.accelerate_module || 0,
      max_speed: opt_2.max_speed || opt_1.min_speed || 0,
      min_speed: opt_2.min_speed || opt_1.min_speed || 0,
      size: size.clone(),
      immortal: opt_2.immortal || opt_1.immortal || false,
      health: opt_2.health || opt_1.health || 100
      // shape: opt_2.shape || opt_1.shape || shapeType.RECTANGLE,
      // radius: opt_2.radius || opt_1.radius || 25
    };
  }

  public setDirection(value: Vector): void {
    if (this.direction && - value.dot(this.direction) === 0) {
      this.size = new Vector(this.size.y, this.size.x);
    }
    this.direction = value;
  }

  public setSpeed(value: Vector): void {
    let speed = value.length() < this.max_speed ? value : value.setLength(this.max_speed);
    speed = value.length() > this.min_speed ? value : value.setLength(this.min_speed);
    this.speed = speed;
  }

  public getId (): string {
    return this.id;
  }

  public getPosition (): Vector {
    return this.position;
  }

  // public getShape (): shapeType {
  //   return this.shape;
  // }

  public getDirection (): Vector {
    return this.direction;
  }


  public getGame (): Game {
    return this.game;
  }

  public getGameState (): GameState {
    return this.gameState;
  }

  // private getRadius(): number {
  //   switch (this.shape) {
  //     case shapeType.CIRCLE:
  //       return this.radius;
  //     case shapeType.RECTANGLE:
  //       return utils.circumscribedCircleRadius(this.size);
  //     default:
  //       return 0;
  //   }
  // }
}
