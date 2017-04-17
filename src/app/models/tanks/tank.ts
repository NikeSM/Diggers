import { Unit } from '../unit';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';

export type tankOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
  max_speed?: number;
  min_speed?: number;
  shotTimeout?: number;
  accelerate_module?: number;
}

export class Tank extends Unit {
  constructor(args: tankOptions) {
    super(args);
  }
}
