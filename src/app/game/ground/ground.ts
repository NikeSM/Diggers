import { Resources } from '../../../resources/index';
import { Vector } from '../../models/math-models/vector';
import { IUnit } from '../../models/unit/unit';
import { CollisionFactory } from '../updater/collisions/collision-factory';
import { GameState } from '../game-state/game-state';

export class Ground {
  private context: CanvasRenderingContext2D;
  private groundMap: Array<Array<boolean>> = [];
  private size: Vector;
  private gameState: GameState;
  private collisionFactory: CollisionFactory;

  constructor(context: CanvasRenderingContext2D, size: Vector, gameState: GameState) {
    this.context = context;
    this.size = size;
    this.gameState = gameState;
    this.collisionFactory = new CollisionFactory(gameState);
    this.init();
  }

  public clearUnitPosition(unit: IUnit): void {
    let leftUp = unit.getUnitPoints().leftUp;
    let rightDown = unit.getUnitPoints().rightDown;
    let sizeX = unit.getRectangleSize().x;
    let sizeY = unit.getRectangleSize().y;
    this.context.clearRect(leftUp.x, leftUp.y, sizeX, sizeY);
    for (let i = Math.floor(leftUp.x); i < Math.ceil(rightDown.x); i++) {
      for (let j = Math.floor(leftUp.y); j < Math.ceil(rightDown.y); j++) {
        this.groundMap[i][j] && this.collisionFactory.getCollisionWithGround(unit);
        this.groundMap[i][j] = false;
      }
    }
  }

  public clearUnitsPosition(units: Array<IUnit>): void {
    units.map(unit => this.clearUnitPosition(unit));
  }


  private init(): void {
    Resources.getImages().grounds.ground.render(this.context, new Vector(0, 0), new Vector(1000, 1000));
    for (let i = 0; i < this.size.x; i++) {
      this.groundMap[i] = [];
      for (let j = 0; j < this.size.y; j++) {
        this.groundMap[i][j] = true;
      }
    }
  }

}
