import { gameState } from './app/game-state';
import { update } from './app/start/update';
import { Handlers } from './app/controller/key-handler';
import { Renderer } from './app/start/render';
import { settings } from './settings';
import { resources } from './resources';

export type appCanvasesType = {
  main: HTMLCanvasElement,
  fixed: HTMLCanvasElement,
  background: HTMLCanvasElement,
  ground: HTMLCanvasElement
}
export type appContextsType = {
  main: CanvasRenderingContext2D,
  fixed: CanvasRenderingContext2D,
  background: CanvasRenderingContext2D,
  ground: CanvasRenderingContext2D
}

class AppStart {
  private canvases: appCanvasesType;
  private contexts: appContextsType;
  private lastTime: number;
  private handlers: Handlers = new Handlers();
  private renderer: Renderer;

  constructor() {
    this.canvases = {
      main: document.createElement('canvas'),
      fixed: document.createElement('canvas'),
      background: document.createElement('canvas'),
      ground: document.createElement('canvas')
    };
    Object.keys(this.canvases).map(key => {
      this.contexts[key] = this.canvases[key].getContext('2d');
      this.canvases[key].height = settings.canvasHeight;
      this.canvases[key].width = settings.canvasWidth;
    });

    this.init = this.init.bind(this);
    this.main = this.main.bind(this);
    this.renderer = new Renderer(this.contexts);
  }

  public init(): void {
    document.body.appendChild(this.canvases.main);
    this.lastTime = Date.now();
    this.main();
  };

  private main(): void {
    let now: number = Date.now();
    let deltaTime: number = (now - this.lastTime) / 1000.0;

    update(deltaTime, this.handlers);
    this.renderer.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.main);
  }
}

window.onload = () => {
  resources.load(['img/terrain.jpg', 'img/sprites.png', 'img/tank_1.png', 'img/wall.png', 'img/background.png']);
  resources.onReady(new AppStart().init);
};
