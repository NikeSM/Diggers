import { Vector } from '../../math-models/vector';
import { shapeType, Unit, unitOptions } from '../unit';
import { Bullet, bulletOptions, defaultBulletOptions } from '../bullet/bullet';
import { utils } from '../../../../utils';
import { Resources } from '../../../../resources/index';

export type tankOptions = {
  unitOptions: unitOptions,
  bulletOptions: bulletOptions
}

export let defaultTankOptions = {
  unitOptions: {
    name: 'Player',
    position: new Vector(200, 200),
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    shotTimeout: 5,
    sprite: null,
    accelerate_module: 20,
    shape: shapeType.RECTANGLE,
    game: null
  },
  bulletOptions: defaultBulletOptions
};

export class Tank extends Unit {
  private bulletOptions: bulletOptions;
  constructor(options: tankOptions) {
    super(options.unitOptions);
    let mergedOptions = utils.merge([defaultTankOptions, options]);
    this.bulletOptions = mergedOptions.bulletOptions;
  }

  public shoot(): void {
    // this.gameState.addDynamicUnit()
  }

  private createBullet(): Bullet {
    return new Bullet(this.bulletOptions);
  }
}
