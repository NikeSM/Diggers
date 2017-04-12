import { Handlers } from '../controller/key-handler';
import { Game } from '../game/index';
import { CollisionChecker } from '../collisions/check-collisions';


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
    this.game.getGameState().getPlayer().update(deltaTime);
  }
}
