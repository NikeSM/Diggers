import { ICollision } from '../i-collision';
import { Unit } from '../../../../models/unit/unit';

export class StopCollision implements ICollision {
  private activeUnit: Unit;
  private staticUnit: Unit;

  constructor(activeUnit: Unit, staticUnit: Unit) {
    this.activeUnit = activeUnit;
    this.staticUnit = staticUnit;
    this.action();
  }

  private action(): void {
    this.activeUnit.stop();
  }
}
