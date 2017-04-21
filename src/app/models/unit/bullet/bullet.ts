import { Vector } from '../../math-models/vector';
import { shapeType, Unit, unitOptions } from '../unit';
import { Resources } from '../../../../resources/index';

export type bulletOptions = {
  unitOptions: unitOptions;
  damage: number;
}

export let defaultBulletOptions = {
  unitOptions: {
    game: null,
    sprite: null,
    name: 'bullet',
    position: new Vector(0, 0),
    size: new Vector(5, 5),
    radius: 10,
    max_speed: 50,
    min_speed: 50,
    accelerate_module: 0,
    shape: shapeType.RECTANGLE
  },
  damage: 0
};

export class Bullet extends Unit {
  constructor(options: bulletOptions) {
    super(options.unitOptions);
  }
}
