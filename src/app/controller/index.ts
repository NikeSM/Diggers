import { gameState } from '../game-state';
import { Handlers} from './key-handler';
import { direction } from '../models/math-models/direction';

export function handleInput(handlers: Handlers): void {
  if (handlers.isDown('DOWN') || handlers.isDown('s')) {
    gameState.player.rotate(direction.DOWN);
  }

  if (handlers.isDown('UP') || handlers.isDown('w')) {
    gameState.player.rotate(direction.UP);
  }

  if (handlers.isDown('LEFT') || handlers.isDown('a')) {
    gameState.player.rotate(direction.LEFT);
  }

  if (handlers.isDown('RIGHT') || handlers.isDown('d')) {
    gameState.player.rotate(direction.RIGHT);
  }
}
