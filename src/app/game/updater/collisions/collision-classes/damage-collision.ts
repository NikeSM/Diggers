import { IUnit } from '../../../../models/unit/unit';
import { Bullet } from '../../../../models/unit/bullet/bullet';
import { ICollision } from '../collision-factory';
import { GameState } from '../../../game-state/game-state';
import { Updater } from '../../updater';

export class DamageCollision implements ICollision {
  private activeUnit: IUnit;
  private staticUnit: IUnit;
  private gameState: GameState;
  private updater: Updater;

  constructor(activeUnit: IUnit, staticUnit: IUnit, gameState: GameState, updater: Updater) {
    this.activeUnit = activeUnit;
    this.staticUnit = staticUnit;
    this.gameState = gameState;
    this.updater = updater;
    this.action();
  }

  private action(): void {
    if (this.activeUnit instanceof Bullet) {
      this.staticUnit.attacked(this.activeUnit.getDamage());
      this.updater.deleteUnit(this.activeUnit);
    }
    if (this.staticUnit instanceof Bullet) {
      this.staticUnit.attacked(this.staticUnit.getDamage());
      this.updater.deleteUnit(this.staticUnit);
    }
  }
}
