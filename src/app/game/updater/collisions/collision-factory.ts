import { ICollision } from './i-collision';
import { Unit } from '../../../models/unit/unit';
import { StopCollision } from './collision-classes/stop-collision';

export class CollisionFactory {
  public static getCollision(activeUnit: Unit, staticUnit: Unit): ICollision {
    return  new StopCollision(activeUnit, staticUnit);
  }
}
