import { Vector } from '../../math-models/vector';
import { shapeType, Unit, unitOptions } from '../unit';

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
    radius: 2.5,
    max_speed: 50,
    min_speed: 50,
    accelerate_module: 5,
    shape: shapeType.RECTANGLE
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
}
