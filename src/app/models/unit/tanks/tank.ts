import { Vector } from '../../math-models/vector';
import { shapeType, Unit, unitOptions } from '../unit';
import { Bullet, bulletOptions, defaultBulletOptions } from '../bullet/bullet';
import { Resources } from '../../../../resources/index';
import { direction } from '../../math-models/direction';

export type tankOptions = {
  unitOptions: unitOptions,
  bulletOptions: bulletOptions,
  shootCoolDown?: number
}

export let defaultTankOptions: tankOptions = {
  unitOptions: {
    name: 'Player',
    position: new Vector(200, 200),
    direction: direction.RIGHT,
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    sprite: null,
    accelerate_module: 20,
    shape: shapeType.RECTANGLE,
    game: null,
    immortal: false,
    health: 100
  },
  bulletOptions: defaultBulletOptions,
  shootCoolDown: 1000
};

export class Tank extends Unit {
  private bulletOptions: bulletOptions;
  private shootCoolDown: number;
  private shootCoolDownTimeout: number;
  constructor(options: tankOptions) {
    super(options.unitOptions);
    let mergedOptions = Tank.mergeTankOptions(defaultTankOptions, options);
    this.bulletOptions = mergedOptions.bulletOptions;
    this.shootCoolDown = mergedOptions.shootCoolDown;
    this.shootCoolDownTimeout = 0;
    this.shoot = this.shoot.bind(this);
  }

  public shoot(deltaTime: number): void {
    if (!this.shootCoolDownTimeout) {
      this.gameState.addDynamicUnit(this.createBullet());
      this.shootCoolDownTimeout = 1;
    }
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
    this.shootCoolDownTimeout = this.shootCoolDownTimeout < deltaTime ? 0 : this.shootCoolDownTimeout - deltaTime;
  }

  public static mergeTankOptions(opt_1: tankOptions, opt_2: tankOptions): tankOptions {
    return {
      unitOptions: Unit.mergeUnitOptions(opt_1.unitOptions, opt_2.unitOptions),
      bulletOptions: Bullet.mergeBulletOptions(opt_1.bulletOptions, opt_2.bulletOptions),
      shootCoolDown: opt_2.shootCoolDown || opt_1.shootCoolDown || 1000
    };
  }

  private createBullet(): Bullet {
    let bulletOptions = Bullet.mergeBulletOptions(this.bulletOptions, {
      unitOptions: {
        game: this.game,
        sprite: Resources.getImages().bullets.bullet,
        direction: this.direction,
        position:  new Vector(this.position.x, this.position.y)
          .add(this.direction.setLength(this.getRectangleSize().x / 2 + this.bulletOptions.unitOptions.size.x / 2 + 5))
      }
    });
    return new Bullet(bulletOptions);
  }
}
