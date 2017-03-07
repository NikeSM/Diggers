export class Handlers {
  private pressedKeys: {[key: string]: boolean} = {};

  constructor() {
    this.setKey = this.setKey.bind(this);
    this.isDown = this.isDown.bind(this);
    window.addEventListener('blur', () => this.pressedKeys = {});
    document.addEventListener('keydown', (e) => this.setKey(e, true));
    document.addEventListener('keyup', (e) => this.setKey(e, false));
  }
  public isDown(key: string): boolean {
    return this.pressedKeys[key.toUpperCase()];
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
