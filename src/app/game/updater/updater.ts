import { Handlers } from '../controller/key-handler';
import { CollisionChecker } from './collisions/check-collisions';
import { IUnit } from '../../models/unit/unit';
import { PositionMap } from '../map/position-map';
import { GameState } from '../game-state/game-state';
import { Ground } from '../ground/ground';


export class Updater {
  private gameState: GameState;
  private collisionChecker: CollisionChecker;
  private positionMap: PositionMap;
  private ground: Ground;

  constructor(gameState: GameState, positionMap: PositionMap, ground: Ground) {
    this.gameState = gameState;
    this.positionMap = positionMap;
    this.ground = ground;
    this.collisionChecker = new CollisionChecker(positionMap, this.gameState, this);
  }

  public update(deltaTime: number, handlers: Handlers): void {
    this.gameState.setGameTime(this.gameState.getGameTime() + deltaTime);
    handlers.handleInput();
    this.updateEntities(deltaTime);
  }

  public deleteUnit(unit: IUnit): void {
    this.gameState.deleteUnit(unit);
    this.positionMap.deleteUnitPositionMap(unit);
  }

  private updateEntities(deltaTime: number): void {
    this.updateEntity(deltaTime, this.gameState.getPlayer());
    this.gameState.getDynamicUnits().map(unit =>
      this.updateEntity(deltaTime, unit)
    );
  }

  private updateEntity(deltaTime: number, unit: IUnit): void {
    if (!this.collisionChecker.collisionWithStatic(unit, unit.getNewPosition(deltaTime))) {
      unit.update(deltaTime);
      this.positionMap.changeUnitPositionMap(unit);
      this.ground.clearUnitPosition(unit);
    }
  }
}
