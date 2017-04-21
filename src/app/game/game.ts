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
  private _gameState: GameState;
  private updater: Updater;
  private _map: Map;

  constructor() {
    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this._gameState = new GameState();
    this.handlers = new Handlers(this);
    this.contexts = {main: null, fixed: null, background: null, ground: null};
  }

  public start(): void {
    let map = new Map();
    this.map = map;
    map.create(this);
    this.updater = new Updater(this, map.positionMap);
    this.canvases = map.getCanvases();
    this.contexts = map.getContexts();
    this.renderer = new Renderer(this.contexts, this.canvases, this);
    document.body.appendChild(this.canvases.main);
    this.lastTime = Date.now();
    this.renderer.preRender();
    this.frame();
  };

  private frame(): void {
    let now: number = Date.now();
    let deltaTime: number = (now - this.lastTime) / 1000.0;

    this.updater.update(deltaTime, this.handlers);
    this.renderer.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.frame);
  }

  get map(): Map {
    return this._map;
  }

  set map(value: Map) {
    this._map = value;
  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(value: GameState) {
    this._gameState = value;
  }
}
