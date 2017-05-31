import { Unit } from '../../../../models/unit/unit';
import { Bullet } from '../../../../models/unit/bullet/bullet';
import { ICollision } from '../collision-factory';

export class GroundCollision implements ICollision {
  private unit: Unit;

  constructor(unit: Unit) {
    this.unit = unit;
    this.action();
  }

  private action(): void {
    if (this.unit instanceof Bullet) {
      this.unit.destroyUnit();
    } else {
      this.unit.groundCollision();
    }
  }
}
