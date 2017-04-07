import { Unit } from '../models/unit';
import { game } from '../../index';
export class CollisionChecker {

  public static collisionWithStatic(entity: Unit): void {
    game.getGameState().getStaticUnits().map(unit => {
      if (this.isCollision(entity, unit)) {
        entity.stop();
      }
    });
  }

  private static  isCollision(unit1: Unit, unit2: Unit): boolean {
    let position1 = unit1.getPosition();
    let position2 = unit2.getPosition();
    let size1 = unit1.getSize();
    let size2 = unit2.getSize();
    return (this.isProjectionsIntersections(
      position1.x + size1.x / 2,
      position1.x - size1.x / 2,
      position2.x + size2.x / 2,
      position2.x - size2.x / 2
    )) && (this.isProjectionsIntersections(
        position1.y + size1.y / 2,
        position1.y - size1.y / 2,
        position2.y + size2.y / 2,
        position2.y - size2.y / 2
      ));
  }

  private static  isProjectionsIntersections(p11: number, p12: number, p21: number, p22: number): boolean {
    let l1 = Math.abs(p11 - p12);
    let l2 = Math.abs(p21 - p22);
    let l = Math.max(p11, p12, p21, p22) - Math.min(p11, p12, p21, p22);
    return l < l1 + l2;
  }
}
