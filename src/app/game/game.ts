import { GameState } from './game-state/game-state';
import { Handlers } from './controller/key-handler';
import { Renderer } from './renderer/renderer';
import { Updater } from './updater/updater';
import { appCanvasesType, appContextsType, Map } from './map/map';

export class Game {
  private canvases: appCanvasesType;
  private contexts: appContextsType;
  private lastTime: number;
  private handlers: Handlers;
  private renderer: Renderer;
  private gameState: GameState;
  private updater: Updater;
  private map: Map;

  constructor() {
    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this.gameState = new GameState();
    this.handlers = new Handlers(this);
    this.contexts = {main: null, fixed: null, background: null, ground: null};
  }

  public start(): void {
    let map = new Map();
    this.map = map;
    map.create(this);
    this.updater = new Updater(this, map.getPositionMap());
    this.canvases = map.getCanvases();
    this.contexts = map.getContexts();
    this.renderer = new Renderer(this.contexts, this.canvases, this);
    document.body.appendChild(this.canvases.main);
    this.lastTime = Date.now();
    this.renderer.preRender();
    this.frame();
  };

  public getGameState(): GameState {
    return this.gameState;
  }

  public getMap(): Map {
    return this.map;
  }

  private frame(): void {
    let now: number = Date.now();
    let deltaTime: number = (now - this.lastTime) / 1000.0;

    this.updater.update(deltaTime, this.handlers);
    this.renderer.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.frame);
  }
}
