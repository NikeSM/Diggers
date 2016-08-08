import { gameState } from '../game-state';

export function gameOver() {
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('game-over-overlay').style.display = 'block';
  gameState.isGameOver = true;
}