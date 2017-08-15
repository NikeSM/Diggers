import { IUnit } from '../../../../models/unit/unit';
import { ICollision } from '../collision-factory';

export class StopCollision implements ICollision {
  private activeUnit: IUnit;
  private staticUnit: IUnit;
  private distance: number;

  constructor(activeUnit: IUnit, staticUnit: IUnit, distance: number) {
    this.activeUnit = activeUnit;
    this.staticUnit = staticUnit;
    this.distance = distance;
    this.action();
  }

  private action(): void {
    this.activeUnit.stop(this.distance);
  }
}
