import { IUnit } from '../../../../models/unit/unit';
import { Bullet } from '../../../../models/unit/bullet/bullet';
import { ICollision } from '../collision-factory';
import { GameState } from '../../../game-state/game-state';

export class GroundCollision implements ICollision {
  private unit: IUnit;
  private gameState: GameState;

  constructor(unit: IUnit, gameState: GameState) {
    this.unit = unit;
    this.gameState = gameState;
    this.action();
  }

  private action(): void {
    if (this.unit instanceof Bullet) {
      this.gameState.deleteUnit(this.unit);
    } else {
      this.unit.groundCollision();
    }
  }
}
