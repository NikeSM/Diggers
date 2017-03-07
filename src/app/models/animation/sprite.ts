import { resources } from '../../../resources';
export class Sprite {
  private spritePosition: Array<number>;
  private size: Array<number>;
  private animationSpeed: number;
  private frames: Array<number>;
  private _index: number;
  private url: string;
  private spriteDirection: string;
  private once: boolean;
  private done: boolean;

  constructor(url: string,
              spritePosition: Array<number>,
              size: Array<number>,
              speed?: number,
              frames?: Array<number>,
              spriteDirection?: string,
              once?: boolean) {
    this.spritePosition = spritePosition;
    this.size = size;
    this.animationSpeed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.spriteDirection = spriteDirection || 'horizontal';
    this.once = once;
  }

  public render(context: CanvasRenderingContext2D): void {
    let frame: number;

    if (this.animationSpeed > 0) {
      let max: number = this.frames.length;
      let idx: number = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }


    let x: number = this.spritePosition[0];
    let y: number = this.spritePosition[1];

    (this.spriteDirection === 'vertical') ?
      y += frame * this.size[1] :
      x += frame * this.size[0];

    context.drawImage(
      resources.get(this.url),
      x, y,
      this.size[0], this.size[1],
      0, 0,
      this.size[0], this.size[1]);
    }

  public update(deltaTime: number): void {
    this._index += this.animationSpeed * deltaTime;
  }

  public getSize (): Array<number> { return this.size; }
  public isDone (): boolean { return this.done; }
}
