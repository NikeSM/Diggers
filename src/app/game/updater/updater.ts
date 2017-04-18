import { Handlers } from '../controller/key-handler';
import { Game } from '../game';
import { CollisionChecker } from './collisions/check-collisions';
import { ShapeUnit } from '../../models/unit/shape-unit/shape-unit';


export class Updater {
  private game: Game;
  private collisionChecker: CollisionChecker;
  constructor(game: Game) {
    this.game = game;
    this.collisionChecker = new CollisionChecker(game);
  }

  public update(deltaTime: number, handlers: Handlers): void {
    this.game.getGameState().setTime(this.game.getGameState().getTime() + deltaTime);
    handlers.handleInput();
    this.updateEntities(deltaTime);
  }

  public updateEntities(deltaTime: number): void {
    this.updateEntity(deltaTime, this.game.getGameState().getPlayer());
  }

  private updateEntity(deltaTime: number, unit: ShapeUnit): void {
    if (this.collisionChecker.collisionWithStatic(unit, unit.getNewPosition(deltaTime))) {
      unit.stop();
    } else {
      unit.update(deltaTime);
    }
  }
}
