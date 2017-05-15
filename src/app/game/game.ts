import { GameState } from './game-state/game-state';
import { Handlers } from './controller/key-handler';
import { Renderer } from './renderer/renderer';
import { Updater } from './updater/updater';
import { appCanvasesType, appContextsType, Map } from './map/map';
import { Ground } from './ground/ground';

export class Game {
  private canvases: appCanvasesType;
  private contexts: appContextsType;
  private lastTime: number;
  private handlers: Handlers;
  private renderer: Renderer;
  private gameState: GameState;
  private updater: Updater;
  private map: Map;
  private ground: Ground;


  constructor() {
    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this.gameState = new GameState();
    this.handlers = new Handlers(this);
    this.contexts = {main: null, fixed: null, background: null, ground: null};
  }

  public start(): void {
    this.map = new Map();
    this.map.create(this);
    this.updater = new Updater(this, this.map.getPositionMap());
    this.canvases = this.map.getCanvases();
    this.contexts = this.map.getContexts();
    this.ground = new Ground(this.contexts.ground);
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

  public getGround(): Ground {
    return this.ground;
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
