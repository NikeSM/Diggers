import { Handlers} from './key-handler';
import { direction } from '../models/math-models/direction';
import { game } from '../../index';

export function handleInput(handlers: Handlers): void {
  if (handlers.isDown('DOWN') || handlers.isDown('s')) {
    game.getGameState().getPlayer().rotate(direction.DOWN);
  }

  if (handlers.isDown('UP') || handlers.isDown('w')) {
    game.getGameState().getPlayer().rotate(direction.UP);
  }

  if (handlers.isDown('LEFT') || handlers.isDown('a')) {
    game.getGameState().getPlayer().rotate(direction.LEFT);
  }

  if (handlers.isDown('RIGHT') || handlers.isDown('d')) {
    game.getGameState().getPlayer().rotate(direction.RIGHT);
  }
}
