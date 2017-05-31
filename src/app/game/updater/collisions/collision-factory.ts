import { Unit } from '../../../models/unit/unit';
import { StopCollision } from './collision-classes/stop-collision';
import { Bullet } from '../../../models/unit/bullet/bullet';
import { DamageCollision } from './collision-classes/damage-collision';
import { GroundCollision } from './collision-classes/ground-collision';

export interface ICollision {
}

export class CollisionFactory {
  public static getCollision(dynamicUnit: Unit, staticUnit: Unit, distance: number): ICollision {
    if (dynamicUnit instanceof Bullet || staticUnit instanceof Bullet) {
      return new DamageCollision(dynamicUnit, staticUnit);
    }
    return  new StopCollision(dynamicUnit, staticUnit, distance);
  }
  public static getCollisionWithGround(unit: Unit): ICollision {
    return  new GroundCollision(unit);
  }
}
