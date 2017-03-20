import { gameState } from '../game-state';
import { checkCollisions } from '../collisions/check-collisions';
import { handleInput } from '../controller/index';
import { Handlers } from '../controller/key-handler';

export function update(deltaTime: number, handlers: Handlers): void {
  gameState.gameTime += deltaTime;

  handleInput(handlers);
  updateEntities(deltaTime);
  checkCollisions();
}

function updateEntities(deltaTime: number): void {
  gameState.player.update(deltaTime);
}
