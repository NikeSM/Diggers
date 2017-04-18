import { Vector } from '../../../math-models/vector';
import { Sprite } from '../../../animation/sprite';
import { shapeType, ShapeUnit } from '../shape-unit';

export type tankOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  max_speed?: number;
  min_speed?: number;
  shotTimeout?: number;
  accelerate_module?: number;
  shape: shapeType;
}

export class Tank extends ShapeUnit {
  constructor(args: tankOptions) {
    super(args);
  }
}
