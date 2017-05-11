import { Handlers } from '../controller/key-handler';
import { Game } from '../game';
import { CollisionChecker } from './collisions/check-collisions';
import { Unit } from '../../models/unit/unit';
import { PositionMap } from '../map/position-map';


export class Updater {
  private game: Game;
  private collisionChecker: CollisionChecker;
  private positionMap: PositionMap;

  constructor(game: Game, positionMap: PositionMap) {
    this.game = game;
    this.positionMap = positionMap;
    this.collisionChecker = new CollisionChecker(game, positionMap);
  }

  public update(deltaTime: number, handlers: Handlers): void {
    this.game.getGameState().setGameTime(this.game.getGameState().getGameTime() + deltaTime);
    handlers.handleInput(deltaTime);
    this.updateEntities(deltaTime);
  }

  public updateEntities(deltaTime: number): void {
    this.updateEntity(deltaTime, this.game.getGameState().getPlayer());
    this.game.getGameState().getDynamicUnits().map(unit =>
      this.updateEntity(deltaTime, unit)
    );
  }

  private updateEntity(deltaTime: number, unit: Unit): void {
    if (!this.collisionChecker.collisionWithStatic(unit, unit.getNewPosition(deltaTime))) {
      unit.update(deltaTime);
      this.positionMap.changeUnitPositionMap(unit);
    }
  }
}
