import { Vector } from '../../math-models/vector';
import { IUnit, mergeUnitOptions, Unit, unitOptions } from '../unit';
import { Direction } from '../../math-models/direction';

export type bulletOptions = {
  unitOptions: unitOptions;
  damage?: number;
}

export let mergeBulletOptions = (opt_1: bulletOptions, opt_2: bulletOptions): bulletOptions => {
  return {
    unitOptions: mergeUnitOptions(opt_1.unitOptions, opt_2.unitOptions),
    damage: opt_2.damage || opt_1.damage || 0
  };
};

export let defaultBulletOptions = {
  unitOptions: {
    sprite: null,
    name: 'bullet',
    position: new Vector(0, 0),
    direction: Direction.RIGHT,
    size: new Vector(10, 10),
    max_speed: 50,
    min_speed: 50,
    accelerate_module: 5,
    immortal: false,
    health: 100
  },
  damage: 0
};

export class Bullet extends Unit implements IBullet {
  private damage: number;

  constructor(options: bulletOptions) {
    let mergedOptions = mergeBulletOptions(defaultBulletOptions, options);
    super(mergedOptions.unitOptions);
    this.damage = mergedOptions.damage;
  }

  public getDamage(): number {
    return this.damage;
  }
}

interface IBullet extends IUnit {
  getDamage(): number;
}
