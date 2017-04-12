import { Unit } from '../models/unit';
import { Vector } from '../models/math-models/vector';
import { Game } from '../game/index';

type isRectsCollisionArgsType = {
  rect1: {
    position: Vector,
    size: Vector
  },
  rect2: {
    position: Vector,
    size: Vector
  },
};

export class CollisionChecker {
  private game: Game;
  constructor(game: Game) {
    this.game = game;
  }
  public collisionWithStatic(entity: Unit, newPosition: Vector): boolean {
    let isCollision = false;
    this.game.getGameState().getStaticUnits().map(unit => {
      if (this.isRectsCollision({
          rect1: {
            position: unit.getPosition(),
            size: unit.getSize()
          }, rect2: {
            position: newPosition,
            size: entity.getSize()
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

  private isProjectionsIntersections(p11: number, p12: number, p21: number, p22: number): boolean {
    let l1 = Math.abs(p11 - p12);
    let l2 = Math.abs(p21 - p22);
    let l = Math.max(p11, p12, p21, p22) - Math.min(p11, p12, p21, p22);
    return l < l1 + l2;
  }
}
