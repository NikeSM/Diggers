import { Sprite } from './models/animation/sprite';
import {Unit} from './models/unit';
export module gameState {
  export let canvas = null;
  
  // export let player = {
  //   pos: [0, 0],
  //   sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
  // };
  
  export let player = new Unit({sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])});
  
  export let bullets: Array<any> = [];
  export let enemies: Array<any> = [];
  export let explosions: Array<any> = [];

  export let lastFire: number = Date.now();
  export let gameTime: number = 0;
  export let isGameOver: boolean;
  export let terrainPattern;

// The score
  export let score: number = 0;
  export let scoreEl: HTMLElement;
}