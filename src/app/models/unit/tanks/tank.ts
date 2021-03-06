import { Vector } from '../../math-models/vector';
import { mergeUnitOptions, IUnit, Unit, unitOptions } from '../unit';
import { Bullet, bulletOptions, defaultBulletOptions, mergeBulletOptions } from '../bullet/bullet';
import { Resources } from '../../../../resources/index';
import { Direction } from '../../math-models/direction';

export type tankOptions = {
  unitOptions: unitOptions,
  bulletOptions: bulletOptions,
  shootCoolDown?: number
}

export let defaultTankOptions: tankOptions = {
  unitOptions: {
    name: 'Player',
    position: new Vector(200, 200),
    direction: Direction.RIGHT,
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    sprite: null,
    accelerate_module: 20,
    immortal: false,
    health: 100
  },
  bulletOptions: defaultBulletOptions,
  shootCoolDown: 1000
};

export let mergeTankOptions = (opt_1: tankOptions, opt_2: tankOptions): tankOptions => {
  return {
    unitOptions: mergeUnitOptions(opt_1.unitOptions, opt_2.unitOptions),
    bulletOptions: mergeBulletOptions(opt_1.bulletOptions, opt_2.bulletOptions),
    shootCoolDown: opt_2.shootCoolDown || opt_1.shootCoolDown || 1000
  };
};

export class Tank extends Unit implements ITank {
  private bulletOptions: bulletOptions;
  private shootCoolDown: number;
  private shootCoolDownTimeout: number;
  constructor(options: tankOptions) {
    super(options.unitOptions);
    let mergedOptions = mergeTankOptions(defaultTankOptions, options);
    this.bulletOptions = mergedOptions.bulletOptions;
    this.shootCoolDown = mergedOptions.shootCoolDown;
    this.shootCoolDownTimeout = 0;
    this.shoot = this.shoot.bind(this);
  }

  public shoot(): Bullet {
    if (!this.shootCoolDownTimeout) {
      this.shootCoolDownTimeout = 1;
      return this.createBullet();
    }
    return null;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
    this.shootCoolDownTimeout = this.shootCoolDownTimeout < deltaTime ? 0 : this.shootCoolDownTimeout - deltaTime;
  }

  private createBullet(): Bullet {
    let bulletOptions = mergeBulletOptions(this.bulletOptions, {
      unitOptions: {
        sprite: Resources.getImages().bullets.bullet,
        direction: this.getDirection(),
        position:  new Vector(this.getPosition().x, this.getPosition().y)
          .add(
            this.getDirection().setLength(this.getRectangleSize().x / 2 + this.bulletOptions.unitOptions.size.x / 2 + 1)
          )
      }
    });
    return new Bullet(bulletOptions);
  }
}

export interface ITank extends IUnit {
  shoot(): Bullet;
}
