import { Sprite } from '../models/animation/sprite';
import { gameState } from '../game-state';
import { settings } from '../../settings';
import { checkCollisions } from '../collisions/check-collisions';
import { handleInput } from '../controller/index';

export function update(deltaTime: number): void {
  gameState.gameTime += deltaTime;

  handleInput(deltaTime);
  updateEntities(deltaTime);

  // It gets harder over time by adding enemies using this
  // equation: 1-.993^gameTime
  // if (Math.random() < 1 - Math.pow(.993, gameState.gameTime)) {
  //   gameState.enemies.push({
  //     pos: [settings.canvasWidth,
  //       Math.random() * (settings.canvasHeight - 39)],
  //     sprite: new Sprite('img/sprites.png', [0, 78], [80, 39],
  //       6, [0, 1, 2, 3, 2, 1])
  //   });
  // }

  checkCollisions();

  gameState.scoreEl.innerHTML = String(gameState.score);
}

function updateEntities(deltaTime: number) {
  // Update the player sprite animation
  gameState.player.update(deltaTime);

  // Update all the bullets
  // gameState.bullets.map((bullet) => {
  //   switch(bullet.dir) {
  //     case 'up': bullet.pos[1] -= settings.bulletSpeed * deltaTime; break;
  //     case 'down': bullet.pos[1] += settings.bulletSpeed * deltaTime; break;
  //     default:
  //       bullet.pos[0] += settings.bulletSpeed * deltaTime;
  //   }
  //
  //   // Remove the bullet if it goes offscreen
  //   if (bullet.pos[1] < 0 || bullet.pos[1] > settings.canvasHeight ||
  //     bullet.pos[0] > settings.canvasWidth) {
  //     gameState.bullets = gameState.bullets.filter((b) => b != bullet )
  //   }
  // });
  //
  // // Update all the enemies
  // gameState.enemies.map((enemy) => {
  //   enemy.pos[0] -= settings.enemySpeed * deltaTime;
  //   enemy.sprite.update(deltaTime);
  //
  //   // Remove if offscreen
  //   if (enemy.pos[0] + enemy.sprite.getSize()[0] < 0) {
  //     gameState.enemies = gameState.enemies.filter((e) => e != enemy )
  //   }
  // });
  //
  // // Update all the explosions
  // gameState.explosions.map((explosion) => {
  //   explosion.sprite.update(deltaTime);
  //
  //   // Remove if animation is done
  //   if (explosion.sprite.isDone()) {
  //     gameState.explosions = gameState.explosions.filter((e) => e != explosion )
  //   }
  // });
}