import { shapeType, Unit, unitOptions } from '../unit';
import { Vector } from '../../math-models/vector';

export type wallOptions = {
  unitOptions: unitOptions;
}

export let defaultWallOptions: wallOptions = {
  unitOptions: {
    game: null,
    sprite: null,
    name: 'wall',
    position: new Vector(0, 0),
    accelerate_module: 0,
    max_speed: 0,
    min_speed: 0,
    shape: shapeType.RECTANGLE,
    size: new Vector(10, 10),
    radius: 5
  }
};

export class Wall extends Unit {
  constructor(options: wallOptions) {
    super(options.unitOptions);
  }
}