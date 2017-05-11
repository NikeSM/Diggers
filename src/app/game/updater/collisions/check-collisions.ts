import { Vector } from '../../../models/math-models/vector';
import { Game } from '../../game';
import { Unit } from '../../../models/unit/unit';
import { PositionMap } from '../../map/position-map';
import { Direction } from '../../../models/math-models/direction';
import { CollisionFactory } from './collision-factory';

type rectType = {
  position: Vector;
  size: Vector;
  direction: Vector;
}
type isRectsCollisionArgsType = {
  rect1: rectType;
  rect2: rectType;
};

export class CollisionChecker {
  private game: Game;
  private positionMap: PositionMap;

  constructor(game: Game, positionMap: PositionMap) {
    this.game = game;
    this.positionMap = positionMap;
  }

  public collisionWithStatic(dynamicUnit: Unit, newPosition: Vector): boolean {
    let collisionsArray: Array<{staticUnit: Unit, distance: number}> = [];
    let units = this.positionMap.getCollisionUnits(dynamicUnit, newPosition);
    units.map(staticUnit => {
      if (this.unitMoveCollision(dynamicUnit, newPosition, staticUnit)) {
        let distance = this.getDistance(
          { position: dynamicUnit.getPosition(),
            size: dynamicUnit.getRectangleSize(),
            direction: dynamicUnit.getDirection()
          },
          { position: staticUnit.getPosition(),
            size: staticUnit.getRectangleSize(),
            direction: staticUnit.getDirection()
          }
        );
        collisionsArray.push({staticUnit, distance});
      }
    });
    if (collisionsArray.length) {
      collisionsArray.sort((a, b) => a.distance - b.distance);
      CollisionFactory.getCollision(dynamicUnit, collisionsArray[0].staticUnit, collisionsArray[0].distance);
    }
    return !!collisionsArray.length;
  }

  private unitMoveCollision(dynamicUnit: Unit, newPosition: Vector, staticUnit: Unit): boolean {
      return this.isRectsCollision({
        rect1: { position: staticUnit.getPosition(),
          size: staticUnit.getRectangleSize(),
          direction: dynamicUnit.getDirection()
        },
        rect2: { position: newPosition,
          size: dynamicUnit.getRectangleSize(),
          direction: staticUnit.getDirection()
        }
      });
  }

  private isRectsCollision(args: isRectsCollisionArgsType): boolean {
    let position1 = args.rect1.position;
    let position2 = args.rect2.position;
    let size1 = args.rect1.size;
    let size2 = args.rect2.size;
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

  private isProjectionsIntersections(p11: number, p12: number, p21: number, p22: number): boolean {
    let projectsLengths = this.projectsLengths(p11, p12, p21, p22);
    return projectsLengths.l < projectsLengths.l1 + projectsLengths.l2;
  }

  private projectsLengths(p11: number, p12: number, p21: number, p22: number): { l1: number, l2: number, l: number } {
    let l1 = Math.abs(p11 - p12);
    let l2 = Math.abs(p21 - p22);
    let l = Math.max(p11, p12, p21, p22) - Math.min(p11, p12, p21, p22);
    return { l1, l2, l };
  }

  private getDistance(dynamicRect: rectType, staticRect: rectType): number {
    let dynamicLeftUpPoint = dynamicRect.position.add(new Vector(-dynamicRect.size.x / 2, -dynamicRect.size.y / 2));
    let dynamicRightUpPoint = dynamicRect.position.add(new Vector(dynamicRect.size.x / 2, -dynamicRect.size.y / 2));
    let dynamicLeftDownPoint = dynamicRect.position.add(new Vector(-dynamicRect.size.x / 2, dynamicRect.size.y / 2));

    let staticLeftUpPoint = staticRect.position.add(new Vector(-staticRect.size.x / 2, -staticRect.size.y / 2));
    let staticRightUpPoint = staticRect.position.add(new Vector(staticRect.size.x / 2, -staticRect.size.y / 2));
    let staticLeftDownPoint = staticRect.position.add(new Vector(-staticRect.size.x / 2, staticRect.size.y / 2));
    if (dynamicRect.direction === Direction.LEFT || dynamicRect.direction === Direction.RIGHT) {
      let projectsLengthX = this.projectsLengths(
        dynamicLeftUpPoint.x,
        dynamicRightUpPoint.x,
        staticLeftUpPoint.x,
        staticRightUpPoint.x
      );
      return projectsLengthX.l - projectsLengthX.l1 - projectsLengthX.l2;
    } else {
      let projectsLengthY = this.projectsLengths(
        dynamicLeftUpPoint.y,
        dynamicLeftDownPoint.y,
        staticLeftUpPoint.y,
        staticLeftDownPoint.y
      );
      return projectsLengthY.l - projectsLengthY.l1 - projectsLengthY.l2;
    }
  }
}
