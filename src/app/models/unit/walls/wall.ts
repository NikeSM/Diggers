import { Unit, unitOptions } from '../unit';
import { Vector } from '../../math-models/vector';
import { Direction } from '../../math-models/direction';

export type wallOptions = {
  unitOptions: unitOptions;
}

export let defaultWallOptions: wallOptions = {
  unitOptions: {
    game: null,
    sprite: null,
    name: 'wall',
    direction: Direction.RIGHT,
    position: new Vector(0, 0),
    accelerate_module: 0,
    max_speed: 0,
    min_speed: 0,
    size: new Vector(10, 10),
    immortal: true,
    health: 100
  }
};

export class Wall extends Unit {
  constructor(options: wallOptions) {
    let mergedOptions = Wall.mergeWallOptions(defaultWallOptions, options);
    super(mergedOptions.unitOptions);
  }

  public static mergeWallOptions(opt_1: wallOptions, opt_2: wallOptions): wallOptions {
    return {
      unitOptions: Unit.mergeUnitOptions(opt_1.unitOptions, opt_2.unitOptions)
    };
  }
}
