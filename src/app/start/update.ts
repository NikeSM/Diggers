import { handleInput } from '../controller/index';
import { Handlers } from '../controller/key-handler';
import { game } from '../../index';

export class Updater {
  public static update(deltaTime: number, handlers: Handlers): void {
    game.getGameState().setTime(game.getGameState().getTime() + deltaTime);

    handleInput(handlers);
    Updater.updateEntities(deltaTime);
  }

  public static updateEntities(deltaTime: number): void {
    game.getGameState().getPlayer().update(deltaTime);
  }
}
