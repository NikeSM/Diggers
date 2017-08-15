import { IUnit } from '../../../models/unit/unit';
import { StopCollision } from './collision-classes/stop-collision';
import { Bullet } from '../../../models/unit/bullet/bullet';
import { DamageCollision } from './collision-classes/damage-collision';
import { GroundCollision } from './collision-classes/ground-collision';
import { GameState } from '../../game-state/game-state';
import { Updater } from '../updater';

export interface ICollision {
}

export class CollisionFactory {
  private gameState: GameState;
  private updater: Updater;

  constructor(gameState: GameState, updater?: Updater) {
    this.gameState = gameState;
    this.updater = updater;
  }
  public getCollision(dynamicUnit: IUnit, staticUnit: IUnit, distance: number): ICollision {
    if (dynamicUnit instanceof Bullet || staticUnit instanceof Bullet) {
      return new DamageCollision(dynamicUnit, staticUnit, this.gameState, this.updater);
    }
    return  new StopCollision(dynamicUnit, staticUnit, distance);
  }
  public getCollisionWithGround(unit: IUnit): ICollision {
    return  new GroundCollision(unit, this.gameState);
  }
}
