import { Resources } from './resources';
import { Game } from './app/game/game';
import { utils } from './utils';
import merge = utils.merge;


window.onload = () => {
  Resources.load();
  Resources.addOnReadyListener(() => {
    // let a = {1: 'a1', 2: 'a2', 4: {1: 'a41', 2: 'a42'}};
    // let b = {2: 'b2', 3: 'b3', 4: {2: 'b42', 3: 'b43'}};
    // console.log(merge([a, b]), 'merge');
    let game = new Game();
    game.start();
  });
};
