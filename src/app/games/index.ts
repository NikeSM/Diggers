import { gameState } from '../game-state';
import { Resources } from '../../resources/index';
import { Tank } from '../models/tanks/index';
import { Wall } from '../models/walls/index';
import { Vector } from '../models/math-models/vector';

export class Game {
  public static start() {
    gameState.setPlayer(new Tank({
    name: 'Player',
    position: new Vector(200, 200),
    size: new Vector(50, 50),
    max_speed: 200,
    min_speed: 5,
    shotTimeout: 5,
    sprite: Resources.getImages().tanks.tank,
    accelerate: 20
  }));
    gameState.addStaticUnit(new Wall({
      sprite: Resources.getImages().walls.wall,
      position: new Vector(250, 0),
      size: new Vector(500, 10),
    }));
  }
}