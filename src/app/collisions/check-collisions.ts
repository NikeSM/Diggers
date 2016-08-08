import { gameState } from '../game-state';
import { Sprite } from '../models/animation/sprite';
import { gameOver } from '../end/index';
import { settings } from '../../settings';

export function checkCollisions() {
  // checkPlayerBounds();
  //
  // // Run collision detection for all enemies and bullets
  // gameState.enemies.map((enemy) => {
  //   let pos = enemy.pos;
  //   let size = enemy.sprite.getSize;
  //
  //   gameState.bullets.map((bullet) => {
  //     let pos2 = bullet.pos;
  //     let size2 = bullet.sprite.getSize;
  //
  //     if(boxCollides(pos, size, pos2, size2)) {
  //       // Remove the enemy
  //       gameState.enemies = gameState.enemies.filter((e) => e !== enemy);
  //
  //       // Add score
  //       gameState.score += 100;
  //
  //       // Add an explosion
  //       gameState.explosions.push({
  //         pos: pos,
  //         sprite: new Sprite('img/sprites.png',
  //           [0, 117],
  //           [39, 39],
  //           16,
  //           [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //           null,
  //           true)
  //       });
  //
  //       // Remove the bullet and stop this iteration
  //       gameState.bullets = gameState.bullets.filter((e) => e !== bullet);
  //     }
  //   });
  //
  //   if(boxCollides(pos, size, gameState.player.pos, gameState.player.sprite.getSize())) {
  //     gameOver();
  //   }
  // })
}

function checkPlayerBounds() {
  // // Check bounds
  // if (gameState.player.pos[0] < 0) {
  //   gameState.player.pos[0] = 0;
  // }
  // else if (gameState.player.pos[0] > settings.canvasWidth - gameState.player.sprite.getSize()[0]) {
  //   gameState.player.pos[0] = settings.canvasWidth - gameState.player.sprite.getSize()[0];
  // }
  //
  // if (gameState.player.pos[1] < 0) {
  //   gameState.player.pos[1] = 0;
  // }
  // else if (gameState.player.pos[1] > settings.canvasHeight - gameState.player.sprite.getSize()[1]) {
  //   gameState.player.pos[1] = settings.canvasHeight - gameState.player.sprite.getSize()[1];
  // }
}

function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 ||
  b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(pos[0], pos[1],
    pos[0] + size[0], pos[1] + size[1],
    pos2[0], pos2[1],
    pos2[0] + size2[0], pos2[1] + size2[1]);
}