import { gameState } from '../game-state';
import { settings } from '../../settings';
import { Sprite } from '../models/animation/sprite';
import { input } from './key-handler';
import { Vector } from '../models/math-models/vector';
export function handleInput(deltaTime: number) {
  if(input.isDown('DOWN') || input.isDown('s')) {
    gameState.player.changeAcceleration((new Vector(0, 1000)).multiply(deltaTime));
  }

  if(input.isDown('UP') || input.isDown('w')) {
    gameState.player.changeAcceleration((new Vector(0, -1000)).multiply(deltaTime));
  }

  if(input.isDown('LEFT') || input.isDown('a')) {
    gameState.player.changeAcceleration((new Vector(-1000, 0)).multiply(deltaTime));
  }

  if(input.isDown('RIGHT') || input.isDown('d')) {
    gameState.player.changeAcceleration((new Vector(1000, 0)).multiply(deltaTime));
  }

  // if(input.isDown('SPACE') &&
  //   !gameState.isGameOver &&
  //   Date.now() - gameState.lastFire > 100) {
  //   let x = gameState.player.pos[0] + gameState.player.sprite.getSize()[0] / 2;
  //   let y = gameState.player.pos[1] + gameState.player.sprite.getSize()[1] / 2;
  //
  //   gameState.bullets.push({ pos: [x, y],
  //     dir: 'forward',
  //     sprite: new Sprite('img/sprites.png', [0, 39], [18, 8]) });
  //   gameState.bullets.push({ pos: [x, y],
  //     dir: 'up',
  //     sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
  //   gameState.bullets.push({ pos: [x, y],
  //     dir: 'down',
  //     sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });
  //
  //
  //   gameState.lastFire = Date.now();
  // }
}
