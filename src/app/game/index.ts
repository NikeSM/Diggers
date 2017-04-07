import { GameState } from './game-state';
import { Resources } from '../../resources/index';
import { Tank } from '../models/tanks/index';
import { Wall } from '../models/walls/index';
import { Vector } from '../models/math-models/vector';
import { Handlers } from '../controller/key-handler';
import { Renderer } from '../start/render';
import { settings } from '../../settings';
import { Updater } from '../start/update';


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

export class Game {
  private canvases: appCanvasesType;
  private contexts: appContextsType = {main: null, fixed: null, background: null, ground: null};
  private lastTime: number;
  private handlers: Handlers = new Handlers();
  private renderer: Renderer;
  private gameState: GameState = new GameState();

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

    this.start = this.start.bind(this);
    this.frame = this.frame.bind(this);
    this.renderer = new Renderer(this.contexts, this.canvases);
  }

  public addStartUnits(): void {
    this.gameState.setPlayer(new Tank({
    name: 'Player',
    position: new Vector(200, 200),
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    shotTimeout: 5,
    sprite: Resources.getImages().tanks.tank,
    accelerate: 20
  }));
    for ( let i = 0; i < 50; i++) {
      this.gameState.addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5 + 10 * i, 5),
        size: new Vector(10, 10)
      }));
      this.gameState.addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5 + 10 * i, 495),
        size: new Vector(10, 10)
      }));
      this.gameState.addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5, 5 + 10 * i),
        size: new Vector(10, 10)
      }));
      this.gameState.addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(495, 5 + 10 * i),
        size: new Vector(10, 10)
      }));
    }
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public start(): void {
    document.body.appendChild(this.canvases.main);
    this.lastTime = Date.now();
    this.addStartUnits();
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
