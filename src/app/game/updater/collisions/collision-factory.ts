import { Unit } from '../../../models/unit/unit';
import { StopCollision } from './collision-classes/stop-collision';

export interface ICollision {
}

export class CollisionFactory {
  public static getCollision(activeUnit: Unit, staticUnit: Unit, distance: number): ICollision {
    return  new StopCollision(activeUnit, staticUnit, distance);
  }
}
