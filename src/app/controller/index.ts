import { gameState } from '../game-state';
import { Handlers} from './key-handler';
import { direction } from '../models/math-models/direction';

export function handleInput(handlers: Handlers): void {
  if (handlers.isDown('DOWN') || handlers.isDown('s')) {
    gameState.getPlayer().rotate(direction.DOWN);
  }

  if (handlers.isDown('UP') || handlers.isDown('w')) {
    gameState.getPlayer().rotate(direction.UP);
  }

  if (handlers.isDown('LEFT') || handlers.isDown('a')) {
    gameState.getPlayer().rotate(direction.LEFT);
  }

  if (handlers.isDown('RIGHT') || handlers.isDown('d')) {
    gameState.getPlayer().rotate(direction.RIGHT);
  }
}
