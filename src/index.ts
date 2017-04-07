import { Resources } from './resources';
import { Game } from './app/game/index';

export let game: Game;

window.onload = () => {
  Resources.load();
  Resources.addOnReadyListener(() => {
    game = new Game();
    game.start();
  });
};
