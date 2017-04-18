import { Unit } from '../unit';
import { Vector } from '../../math-models/vector';
import { Sprite } from '../../animation/sprite';
import { utils } from '../../../../utils';

export enum shapeType {
  CIRCLE,
  RECTANGLE
}

export type shapeUnitOptions = {
  sprite: Sprite;
  shape: number;
  name?: string;
  position?: Vector;
  max_speed?: number;
  min_speed?: number;
  accelerate_module?: number;
  radius?: number;
  size?: Vector;
}
let defaultShapeUnitOptions = {
  shape: shapeType.RECTANGLE,
  size: new Vector(50, 50),
  radius: 50
};

export class ShapeUnit extends Unit {
  private _radius: number;
  private _size: Vector;
  private _shape: shapeType;

  constructor(options: shapeUnitOptions) {
    super(options);
    utils.merge([defaultShapeUnitOptions, options]);
    this.radius = options.radius;
    this.size = options.size;
    this.shape = options.shape;
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sprite.render(context, this.getDrawPoint(), this.getRectangleSize());
  }

  public getDrawPoint(): Vector {
    switch (this.shape) {
      case shapeType.CIRCLE:
        return new Vector(-this.radius, -this.radius);
      case shapeType.RECTANGLE:
        // TODO Проверить, как работает с прямоугольником а не  квадратом
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
}
