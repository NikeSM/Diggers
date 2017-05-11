import { Vector } from '../../math-models/vector';
import { Unit, unitOptions } from '../unit';
import { Direction } from '../../math-models/direction';

export type bulletOptions = {
  unitOptions: unitOptions;
  damage?: number;
}

export let defaultBulletOptions = {
  unitOptions: {
    game: null,
    sprite: null,
    name: 'bullet',
    position: new Vector(0, 0),
    direction: Direction.RIGHT,
    size: new Vector(5, 5),
    max_speed: 200,
    min_speed: 200,
    accelerate_module: 5,
    immortal: false,
    health: 100
  },
  damage: 0
};

export class Bullet extends Unit {
  private damage: number;

  constructor(options: bulletOptions) {
    let mergedOptions = Bullet.mergeBulletOptions(defaultBulletOptions, options);
    super(mergedOptions.unitOptions);
    this.damage = mergedOptions.damage;
  }

  public static mergeBulletOptions(opt_1: bulletOptions, opt_2: bulletOptions): bulletOptions {
   return {
     unitOptions: Unit.mergeUnitOptions(opt_1.unitOptions, opt_2.unitOptions),
     damage: opt_2.damage || opt_1.damage || 0
   };
  }

  public getDamage(): number {
    return this.damage;
  }
}
