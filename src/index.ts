import { gameState } from './app/game-state';
import { update } from './app/start/update';
import { Handlers } from './app/controller/key-handler';
import { Renderer } from './app/start/render';
import { settings } from './settings';
import { resources } from './resources';

class AppStart {
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private staticCanvas: HTMLCanvasElement = document.createElement('canvas');
  private context: CanvasRenderingContext2D;
  private staticContext: CanvasRenderingContext2D;
  private lastTime: number;
  private handlers = new Handlers();

  constructor() {
    this.canvas.width = settings.canvasWidth;
    this.canvas.height = settings.canvasHeight;
    this.staticCanvas.width = settings.canvasWidth;
    this.staticCanvas.height = settings.canvasHeight;
    this.context = this.canvas.getContext('2d');
    this.staticContext = this.staticCanvas.getContext('2d');
    this.init = this.init.bind(this);
    this.main = this.main.bind(this);
  }

  public init(): void {
    document.body.appendChild(this.canvas);
    gameState.canvas = this.canvas;
    gameState.staticCanvas = this.staticCanvas;
    this.lastTime = Date.now();
    this.main();
  };

  private main(): void {
    let now: number = Date.now();
    let deltaTime: number = (now - this.lastTime) / 1000.0;
    let renderer = new Renderer(this.context);

    update(deltaTime, this.handlers);
    renderer.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.main);
  }
}

window.onload = () => {
  resources.load(['img/terrain.jpg', 'img/sprites.png', 'img/tank_1.png']);
  resources.onReady(new AppStart().init);
};
