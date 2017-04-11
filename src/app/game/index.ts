import { GameState } from './game-state';
import { Handlers } from '../controller/key-handler';
import { Renderer } from '../start/render';
import { Updater } from '../start/update';
import { appCanvasesType, appContextsType, Map } from './map/index';

export class Game {
  private canvases: appCanvasesType;
  private contexts: appContextsType = {main: null, fixed: null, background: null, ground: null};
  private lastTime: number;
  private handlers: Handlers = new Handlers();
  private renderer: Renderer;
  private gameState: GameState = new GameState();

  constructor() {
    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this.renderer = new Renderer(this.contexts, this.canvases);
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public start(): void {
    let map = new Map();
    map.create(this);
    this.canvases = map.getCanvases();
    this.contexts = map.getContexts();
    document.body.appendChild(this.canvases.main);
    this.lastTime = Date.now();
    this.renderer.preRender();
    this.frame();
  };

  private frame(): void {
    let now: number = Date.now();
    let deltaTime: number = (now - this.lastTime) / 1000.0;

    Updater.update(deltaTime, this.handlers);
    this.renderer.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.frame);
  }
}
