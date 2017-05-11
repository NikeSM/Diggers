import { Vector } from '../../../models/math-models/vector';
import { Game } from '../../game';
import { shapeType, Unit } from '../../../models/unit/unit';
import { PositionMap } from '../../map/position-map';
import { utils } from '../../../../utils';
import { StopCollision } from './collision-classes/stop-collision';
import { Direction } from '../../../models/math-models/direction';

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

  public collisionWithStatic(entity: Unit, newPosition: Vector): boolean {
    let isCollision = false;
    let units = this.positionMap.getCollisionUnits(entity, newPosition);
    units.map(unit => {
      if (this.unitMoveCollision(entity, newPosition, unit)) {
        !isCollision && new StopCollision(unit, entity);
        isCollision = true;
      }
    });
    return isCollision;
  }

  private unitMoveCollision(movedUnit: Unit, newPosition: Vector, unit: Unit): boolean {
    if (unit.getShape() === shapeType.CIRCLE && movedUnit.getShape() === shapeType.CIRCLE) {
      return this.isCircleCollision({
        circle1: { position: unit.getPosition(), radius: unit.getCircleSize() },
        circle2: { position: newPosition, radius: movedUnit.getCircleSize() }
      });
    }
    if (unit.getShape() === shapeType.RECTANGLE && movedUnit.getShape() === shapeType.RECTANGLE) {
      return this.isRectsCollision({
        rect1: { position: unit.getPosition(), size: unit.getRectangleSize() },
        rect2: { position: newPosition, size: movedUnit.getRectangleSize() }
      });
    }
    if (unit.getShape() === shapeType.CIRCLE && movedUnit.getShape() === shapeType.RECTANGLE) {
      return this.isRectCircleCollision({
        circle: { position: unit.getPosition(), radius: unit.getCircleSize() },
        rect: { position: newPosition, size: movedUnit.getRectangleSize() }
      });
    }
    if (unit.getShape() === shapeType.RECTANGLE && movedUnit.getShape() === shapeType.CIRCLE) {
      return this.isRectCircleCollision({
        rect: { position: unit.getPosition(), size: unit.getRectangleSize() },
        circle: { position: newPosition, radius: movedUnit.getCircleSize() }
      });
    }
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
    let projectsLengths = this.projectsLengths(p11, p12, p21, p22);
    return projectsLengths.l <= projectsLengths.l1 + projectsLengths.l2;
  }

  private projectsLengths(p11: number, p12: number, p21: number, p22: number): { l1: number, l2: number, l: number } {
    let l1 = Math.abs(p11 - p12);
    let l2 = Math.abs(p21 - p22);
    let l = Math.max(p11, p12, p21, p22) - Math.min(p11, p12, p21, p22);
    return { l1, l2, l };
  }

  private isRectCircleCollision(args: isCircleRectCollisionArgsType): boolean {
    let rSize = args.rect.size;
    let rPos = args.rect.position;
    let cPos = args.circle.position;
    let cRadius = args.circle.radius;
    let isHorizontalExpandRectCollision = this.isRectsCollision({
      rect1: { position: cPos, size: new Vector(0, 0) },
      rect2: { position: rPos, size: new Vector(rSize.x + 2 * cRadius, rSize.y) }
    });
    let isVerticalExpandRectCollision = this.isRectsCollision({
      rect1: { position: cPos, size: new Vector(0, 0) },
      rect2: { position: rPos, size: new Vector(rSize.x, rSize.y + 2 * cRadius) }
    });

    let isLeftUpCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: { position: rPos.add(new Vector(-rSize.x, -rSize.y)), radius: 0 }
    });
    let isRightUpCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: { position: rPos.add(new Vector(rSize.x, -rSize.y)), radius: 0 }
    });
    let isLeftDownCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: { position: rPos.add(new Vector(-rSize.x, rSize.y)), radius: 0 }
    });
    let isRightDownCircleCollision = this.isCircleCollision({
      circle1: args.circle,
      circle2: { position: rPos.add(new Vector(rSize.x, rSize.y)), radius: 0 }
    });
    return isVerticalExpandRectCollision || isHorizontalExpandRectCollision ||
      isLeftDownCircleCollision || isLeftUpCircleCollision || isRightDownCircleCollision || isRightUpCircleCollision;
  }

  private getRect_RectDistance(dynamicRect: rectType, staticRect: rectType): Vector {
    let dynamicLeftUpPoint = dynamicRect.position.add(new Vector(-dynamicRect.size.x / 2, -dynamicRect.size.y / 2));
    let dynamicRightUpPoint = dynamicRect.position.add(new Vector(dynamicRect.size.x / 2, -dynamicRect.size.y / 2));
    let dynamicLeftDownPoint = dynamicRect.position.add(new Vector(-dynamicRect.size.x / 2, dynamicRect.size.y / 2));

    let staticLeftUpPoint = staticRect.position.add(new Vector(-staticRect.size.x / 2, -staticRect.size.y / 2));
    let staticRightUpPoint = staticRect.position.add(new Vector(staticRect.size.x / 2, -staticRect.size.y / 2));
    let staticLeftDownPoint = staticRect.position.add(new Vector(-staticRect.size.x / 2, staticRect.size.y / 2));

    let projectsLengthX = this.projectsLengths(
      dynamicLeftUpPoint.x,
      dynamicRightUpPoint.x,
      staticLeftUpPoint.x,
      staticRightUpPoint.x
    );
    let distance_x = projectsLengthX.l - projectsLengthX.l1 - projectsLengthX.l2;
    let projectsLengthY = this.projectsLengths(
      dynamicLeftUpPoint.y,
      dynamicLeftDownPoint.y,
      staticLeftUpPoint.y,
      staticLeftDownPoint.y
    );
    let distance_y = projectsLengthY.l - projectsLengthY.l1 - projectsLengthY.l2;
    return new Vector(distance_x, distance_y);
  }

  private getCircle_CircleDistance(circle_1: circleType, circle_2: circleType): Vector {

    let collisionDeltaX = Math.sqrt(
      Math.pow(circle_1.radius + circle_2.radius, 2) +
      Math.pow(circle_1.position.x - circle_2.position.x, 2)
    );
    let collisionMinX = circle_2.position.x - collisionDeltaX;
    let collisionMaxX = circle_2.position.x + collisionDeltaX;
    let distance_x = Math.min(
      Math.abs(circle_2.position.x - collisionMaxX),
      Math.abs(circle_2.position.x - collisionMinX)
    );
    let collisionDeltaY = Math.sqrt(
      Math.pow(circle_1.radius + circle_2.radius, 2) +
      Math.pow(circle_1.position.y - circle_2.position.y, 2)
    );
    let collisionMinY = circle_2.position.y - collisionDeltaY;
    let collisionMaxY = circle_2.position.y + collisionDeltaY;
    let distance_y = Math.min(
      Math.abs(circle_2.position.y - collisionMaxY),
      Math.abs(circle_2.position.y - collisionMinY)
    );
    return new Vector(distance_x, distance_y);
  }
}
