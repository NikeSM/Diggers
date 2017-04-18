import { Sprite } from '../../../animation/sprite';
import { Vector } from '../../../math-models/vector';
import { shapeType, ShapeUnit } from '../shape-unit';

export type wallOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  shape: shapeType
}

export class Wall extends ShapeUnit {
  constructor(args: wallOptions) {
    super(args);
  }
}
