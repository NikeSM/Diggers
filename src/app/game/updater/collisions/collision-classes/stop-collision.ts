import { Unit } from '../../../../models/unit/unit';
import { ICollision } from '../collision-factory';

export class StopCollision implements ICollision {
  private activeUnit: Unit;
  private staticUnit: Unit;
  private distance: number;

  constructor(activeUnit: Unit, staticUnit: Unit, distance: number) {
    this.activeUnit = activeUnit;
    this.staticUnit = staticUnit;
    this.distance = distance;
    this.action();
  }

  private action(): void {
    this.activeUnit.stop(this.distance);
  }
}
