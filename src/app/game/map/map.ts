import { Resources } from '../../../resources/index';
import { Tank } from '../../models/unit/tanks/tank';
import { Wall } from '../../models/unit/walls/wall';
import { Vector } from '../../models/math-models/vector';
import { settings } from '../../../settings';
import { PositionMap } from './position-map';
import { defaultBulletOptions } from '../../models/unit/bullet/bullet';
import { GameState } from '../game-state/game-state';

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
  private gameState: GameState;
  private positionMap: PositionMap;

  public create(gameState: GameState): void {
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
    this.positionMap = new PositionMap({step: 25});
    this.gameState = gameState;
    this.addStartUnits();
  }

  public addStartUnits(): void {
    this.gameState.setPlayer(new Tank({
      unitOptions: {
        name: 'Player',
        position: new Vector(200, 200),
        size: new Vector(20, 20),
        max_speed: 200,
        min_speed: 0,
        sprite: Resources.getImages().tanks.tank,
        accelerate_module: 20,
        health: 100,
        immortal: false,
        underGroundSpeed: 150
      },
      bulletOptions: defaultBulletOptions
    }));
    for (let i = 0; i < 25; i++) {
      let wallOptions = {
        unitOptions: {
          sprite: Resources.getImages().walls.wall,
          position: new Vector(10, i * 20 + 10)
        }
      };
      this.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(490, i * 20 + 10);
      this.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(i * 20 + 10, 10);
      this.gameState.addStaticUnit(new Wall(wallOptions));
      wallOptions.unitOptions.position = new Vector(i * 20 + 10, 490);
      this.gameState.addStaticUnit(new Wall(wallOptions));
    }
    this.gameState.getAllUnits().map(unit => this.positionMap.setUnitPositionMap(unit));
  }

  public getCanvases(): appCanvasesType {
    return this.canvases;
  }

  public getContexts(): appContextsType {
    return this.contexts;
  }

  public getPositionMap(): PositionMap {
    return this.positionMap;
  }

  public static getSize(): Vector {
    return new Vector(settings.canvasWidth, settings.canvasHeight);
  }
}
