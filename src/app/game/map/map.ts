import { Resources } from '../../../resources/index';
import { Tank } from '../../models/unit/tanks/tank';
import { Wall } from '../../models/unit/walls/wall';
import { Vector } from '../../models/math-models/vector';
import { settings } from '../../../settings';
import { Game } from '../game';
import { shapeType } from '../../models/unit/unit';
import { PositionMap } from './position-map';
import { defaultBulletOptions } from '../../models/unit/bullet/bullet';

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
  private _positionMap: PositionMap;

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
    this._positionMap = new PositionMap({step: 25});
    this.game = game;
    this.addStartUnits();
  }

  public addStartUnits(): void {
    this.game.gameState.player = new Tank({
      unitOptions: {
        name: 'Player',
        position: new Vector(200, 200),
        size: new Vector(50, 50),
        max_speed: 200,
        min_speed: 5,
        sprite: Resources.getImages().tanks.tank,
        accelerate_module: 20,
        shape: shapeType.RECTANGLE,
        game: this.game,
        radius: 25,
        health: 100,
        immortal: false
      },
      bulletOptions: defaultBulletOptions
    });
    for (let i = 0; i < 50; i++) {
      let wallOptions = {
        unitOptions: {
          game: this.game,
          sprite: Resources.getImages().walls.wall,
          position: new Vector(5, i * 10 + 5)
        }
      };
      this.game.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(495, i * 10 + 5);
      this.game.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(i * 10 + 5, 5);
      this.game.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(i * 10 + 5, 495);
      this.game.gameState.addStaticUnit(new Wall(wallOptions));
    }
    this.game.gameState.getAllUnits().map(unit => this._positionMap.setUnitPositionMap(unit));
  }

  public getCanvases(): appCanvasesType {
    return this.canvases;
  }

  public getContexts(): appContextsType {
    return this.contexts;
  }

  get positionMap(): PositionMap {
    return this._positionMap;
  }

  set positionMap(value: PositionMap) {
    this._positionMap = value;
  }
}
