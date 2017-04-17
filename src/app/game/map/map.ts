import { Resources } from '../../../resources/index';
import { Tank } from '../../models/tanks/tank';
import { Wall } from '../../models/walls/wall';
import { Vector } from '../../models/math-models/vector';
import { settings } from '../../../settings';
import { Game } from '../game';


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

export class Map {
  private canvases: appCanvasesType;
  private contexts: appContextsType = {main: null, fixed: null, background: null, ground: null};
  private game: Game;

  // constructor() {}

  public create(game: Game): void {
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
    this.game = game;
    this.addStartUnits();
  }

  public addStartUnits(): void {
    this.game.getGameState().setPlayer(new Tank({
    name: 'Player',
    position: new Vector(200, 200),
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    shotTimeout: 5,
    sprite: Resources.getImages().tanks.tank,
    accelerate_module: 20
  }));
    for ( let i = 0; i < 50; i++) {
      this.game.getGameState().addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5 + 10 * i, 5),
        size: new Vector(10, 10)
      }));
      this.game.getGameState().addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5 + 10 * i, 495),
        size: new Vector(10, 10)
      }));
      this.game.getGameState().addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(5, 5 + 10 * i),
        size: new Vector(10, 10)
      }));
      this.game.getGameState().addStaticUnit(new Wall({
        sprite: Resources.getImages().walls.wall,
        position: new Vector(495, 5 + 10 * i),
        size: new Vector(10, 10)
      }));
    }
  }

  public getCanvases (): appCanvasesType {
    return this.canvases;
  }

  public getContexts(): appContextsType {
    return this.contexts;
  }
}
