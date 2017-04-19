import { Vector } from '../../../models/math-models/vector';
import { Game } from '../../game';
import { ShapeUnit } from '../../../models/unit/shape-unit/shape-unit';
import { PositionMap } from '../../map/position-map';
import { utils } from '../../../../utils';

type rectType = {
  position: Vector,
  size: Vector
}

type circleType = {
  position: Vector,
  radius: number
}

type isRectsCollisionArgsType = {
  rect1: rectType,
  rect2: rectType,
};

type isCircleCollisionArgsType = {
  circle1: circleType,
  circle2: circleType,
};

type isCircleRectCollisionArgsType = {
  circle: circleType,
  rect: rectType
};

export class CollisionChecker {
  private game: Game;
  private positionMap: PositionMap;

  constructor(game: Game, positionMap: PositionMap) {
    this.game = game;
    this.positionMap = positionMap;
  }

  public collisionWithStatic(entity: ShapeUnit, newPosition: Vector): boolean {
    let isCollision = false;
    let units = this.positionMap.getCollisionUnits(entity, newPosition);
    units.map(unit => {
      if (this.isRectsCollision({
          rect1: {
            position: unit.position,
            size: unit.getRectangleSize()
          }, rect2: {
            position: newPosition,
            size: entity.getRectangleSize()
          }
        })) {
        entity.stop();
        isCollision = true;
      }
    });
    return isCollision;
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

  private isCircleCollision(args: isCircleCollisionArgsType): boolean {
    let position1 = args.circle1.position;
    let position2 = args.circle2.position;
    return args.circle2.radius + args.circle1.radius <= utils.segmentLength(position1, position2);
  }

  private isProjectionsIntersections(p11: number, p12: number, p21: number, p22: number): boolean {
    let l1 = Math.abs(p11 - p12);
    let l2 = Math.abs(p21 - p22);
    let l = Math.max(p11, p12, p21, p22) - Math.min(p11, p12, p21, p22);
    return l <= l1 + l2;
  }

  private isRectCircleCollision(args: isCircleRectCollisionArgsType): boolean {
    let rSize = args.rect.size;
    let rPos = args.rect.position;
    let cPos = args.circle.position;
    let cRadius = args.circle.radius;
    let isHorizontalExpandRectCollision = this.isRectsCollision({
      rect1: {position: cPos, size: new Vector(0, 0)},
      rect2: {position: rPos, size: new Vector(rSize.x + 2 * cRadius, rSize.y)}
    });
    let isVerticalExpandRectCollision = this.isRectsCollision({
      rect1: {position: cPos, size: new Vector(0, 0)},
      rect2: {position: rPos, size: new Vector(rSize.x, rSize.y + 2 * cRadius)}
    });

    let isLeftUpCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: {position: rPos.add(new Vector(-rSize.x, -rSize.y)), radius: 0}
    });
    let isRightUpCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: {position: rPos.add(new Vector(rSize.x, -rSize.y)), radius: 0}
    });
    let isLeftDownCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: {position: rPos.add(new Vector(-rSize.x, rSize.y)), radius: 0}
    });
    let isRightDownCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: {position: rPos.add(new Vector(rSize.x, rSize.y)), radius: 0}
    });
    return isVerticalExpandRectCollision || isHorizontalExpandRectCollision ||
      isLeftDownCircleCollision || isLeftUpCircleCollision || isRightDownCircleCollision || isRightUpCircleCollision;
  }
}
