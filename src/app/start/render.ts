import { gameState } from '../game-state';
import { settings } from '../../settings';
import { Vector } from '../models/math-models/vector';

let context: CanvasRenderingContext2D;
// Draw everything
export function render(ctx: CanvasRenderingContext2D) {
  context = ctx;
  context.fillStyle = gameState.terrainPattern;
  context.fillRect(0, 0, settings.canvasWidth, settings.canvasHeight);

  // Render the player if the game isn't over
  if(!gameState.isGameOver) {
    renderEntity(gameState.player);
  }

  // renderEntities(gameState.bullets);
  // renderEntities(gameState.enemies);
  // renderEntities(gameState.explosions);
}

function renderEntities(list) {
  for (let i = 0; i < list.length; i++) {
    renderEntity(list[i]);
  }
}

function renderEntity(entity) {
  context.save();
  context.translate(entity.getPosition().x, entity.getPosition().y);
  context.rotate(entity.getSpeed().angleTo(new Vector(1, 0)));
  entity.render(context);
  context.restore();
}