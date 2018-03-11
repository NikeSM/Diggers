import { Resources } from './resources';
import { Game } from './app/game/game';
// import { Vector } from './app/models/math-models/vector';

window.onload = () => {
  Resources.load();
  Resources.addOnReadyListener(() => {
    let game = new Game();
    game.start();
  });
  // Resources.addOnReadyListener(() => {
  //   let testCanvas: HTMLCanvasElement = document.getElementById('test') as HTMLCanvasElement;
  //   let context: CanvasRenderingContext2D = testCanvas.getContext('2d');
  //   Resources.getImages().bullets.bullet.render(context, new Vector(0, 0), new Vector(50, 50));
  // });
};
