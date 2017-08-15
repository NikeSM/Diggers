import { Direction } from '../../models/math-models/direction';
import { GameState } from '../game-state/game-state';
export class Handlers {
  private pressedKeys: { [key: string]: boolean } = {};
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
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
    let player = this.gameState.getPlayer();
    if (this.isDown('DOWN') || this.isDown('s')) {
      player.rotate(Direction.DOWN);
    }

    if (this.isDown('UP') || this.isDown('w')) {
      player.rotate(Direction.UP);
    }

    if (this.isDown('LEFT') || this.isDown('a')) {
      player.rotate(Direction.LEFT);
    }

    if (this.isDown('RIGHT') || this.isDown('d')) {
      player.rotate(Direction.RIGHT);
    }

    if (this.isDown('SPACE')) {
      let bullet = player.shoot();
      this.gameState.addDynamicUnit(bullet);
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
