import { update } from './app/start/update';
import { Handlers } from './app/controller/key-handler';
import { Renderer } from './app/start/render';
import { settings } from './settings';
import { Resources } from './resources';
import { gameState } from './app/game-state';
import { Unit } from './app/models/unit';
import { Sprite } from './app/models/animation/sprite';

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
  private contexts: appContextsType = {main: null, fixed: null, background: null, ground: null};
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
    this.renderer = new Renderer(this.contexts, this.canvases);
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
  Resources.load();
  Resources.addOnReadyListener(() => new AppStart().init());
  gameState.setPlayer(new Unit({sprite:Resources.getImages().tanks.tank}));
};
