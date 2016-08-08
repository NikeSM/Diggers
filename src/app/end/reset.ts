import { gameState } from '../game-state';
import { settings } from '../../settings';

export function reset() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('game-over-overlay').style.display = 'none';
  gameState.isGameOver = false;
  gameState.gameTime = 0;
  gameState.score = 0;

  gameState.enemies = [];
  gameState.bullets = [];

}
