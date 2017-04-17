import { Game } from '../game';
import { direction } from '../../models/math-models/direction';
export class Handlers {
  private pressedKeys: {[key: string]: boolean} = {};
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.setKey = this.setKey.bind(this);
    this.isDown = this.isDown.bind(this);
    window.addEventListener('blur', () => this.pressedKeys = {});
    document.addEventListener('keydown', (e) => this.setKey(e, true));
    document.addEventListener('keyup', (e) => this.setKey(e, false));
  }
  public isDown(key: string): boolean {
    return this.pressedKeys[key.toUpperCase()];
  }

  public handleInput(): void {
  if (this.isDown('DOWN') || this.isDown('s')) {
    this.game.getGameState().getPlayer().rotate(direction.DOWN);
  }

  if (this.isDown('UP') || this.isDown('w')) {
    this.game.getGameState().getPlayer().rotate(direction.UP);
  }

  if (this.isDown('LEFT') || this.isDown('a')) {
    this.game.getGameState().getPlayer().rotate(direction.LEFT);
  }

  if (this.isDown('RIGHT') || this.isDown('d')) {
    this.game.getGameState().getPlayer().rotate(direction.RIGHT);
  }
}

  private setKey(event: KeyboardEvent, status: boolean): void {
    let code: number = event.keyCode;
    let key;

    switch (code) {
    case 32:
      key = 'SPACE';
      break;
    case 37:
      key = 'LEFT';
      break;
    case 38:
      key = 'UP';
      break;
    case 39:
      key = 'RIGHT';
      break;
    case 40:
      key = 'DOWN';
      break;
    default:
      key = String.fromCharCode(code);
    }
    this.pressedKeys[key] = status;
  }
}
