import { Resources } from './resources';
import { Game } from './app/game/game';

window.onload = () => {
  Resources.load();
  Resources.addOnReadyListener(() => {
    let game = new Game();
    game.start();
  });
};
