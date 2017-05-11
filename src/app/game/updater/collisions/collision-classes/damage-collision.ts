import { Unit } from '../../../../models/unit/unit';
import { Bullet } from '../../../../models/unit/bullet/bullet';
import { ICollision } from '../collision-factory';

export class DamageCollision implements ICollision {
  private activeUnit: Unit;
  private staticUnit: Unit;

  constructor(activeUnit: Unit, staticUnit: Unit) {
    this.activeUnit = activeUnit;
    this.staticUnit = staticUnit;
    this.action();
  }

  private action(): void {
    if (this.activeUnit instanceof Bullet) {
      this.staticUnit.attacked(this.activeUnit.getDamage());
      this.activeUnit.destroyUnit();
    }
    if (this.staticUnit instanceof Bullet) {
      this.staticUnit.attacked(this.staticUnit.getDamage());
      this.staticUnit.destroyUnit();
    }
  }
}
