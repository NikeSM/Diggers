import { Unit } from '../unit';
import { Vector } from '../math-models/vector';
import { Sprite } from '../animation/sprite';

export type wallOptions = {
  sprite: Sprite;
  name?: string;
  position?: Vector;
  size?: Vector;
}

export class Wall extends Unit {
  constructor(args: wallOptions) {
    super(args);
  }
}
