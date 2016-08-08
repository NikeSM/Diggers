import { gameState } from './app/game-state';
import { update } from './app/start/update';
import { render } from './app/start/render';
import { reset } from './app/end/reset';
import { settings } from './settings';
import { resources } from './resources'


let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = settings.canvasWidth;
canvas.height = settings.canvasHeight;

export let context: CanvasRenderingContext2D = canvas.getContext('2d');
window.onload = () => {
  document.body.appendChild(canvas);
  gameState.scoreEl = document.getElementById('score');
  gameState.canvas = canvas;
  resources.load(['img/terrain.jpg', 'img/sprites.png']);
  resources.onReady(init);
};

function init() {
  gameState.terrainPattern = context.createPattern(resources.get('img/terrain.jpg'), 'repeat');

  document.getElementById('play-again').addEventListener('click', function() {
    reset()
  });

  reset();
  lastTime = Date.now();
  main();
}

let lastTime: number;

function main() {
  let now: number = Date.now();
  let deltaTime: number = (now - lastTime) / 1000.0;

  update(deltaTime);
  render(context);

  lastTime = now;
  window.requestAnimationFrame(main);
}

