import { Resources } from '../../../resources';
import { Vector } from '../math-models/vector';

export type spriteData = {
  spritePosition: Vector;
  size: Vector;
  animationSpeed?: number;
  framesOrder?: Array<number>;
  imageName?: string;
  isLoop?: boolean;
  isAnimation: boolean;
}

export class Sprite {
  private spritePosition: Vector;
  private size: Vector;
  private animationSpeed: number;
  private framesOrder: Array<number>;
  private timePass: number;
  private url: string;
  private isLoop: boolean;
  private done: boolean;
  private isAnimation: boolean;
  private frame: number;

  constructor(args: spriteData) {
    this.spritePosition = args.spritePosition;
    this.size = args.size;
    this.animationSpeed = args.animationSpeed;
    this.framesOrder = args.framesOrder;
    this.timePass = 0;
    this.url = args.imageName;
    this.isLoop = args.isLoop;
    this.isAnimation = args.isAnimation;
    this.draw = this.draw.bind(this);
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  public render(context: CanvasRenderingContext2D, drawPoint: Vector, drawSize: Vector): void {
    if (!this.isAnimation) {
      this.frame = 0;
      this.draw(context, drawPoint, drawSize);
      return;
    }
    this.frame = this.framesOrder[this.timePass % this.animationSpeed % this.framesOrder.length];

    if (!this.isLoop && this.frame >= this.framesOrder.length) {
      this.done = true;
      return;
    }

    this.draw(context, drawPoint, drawSize);
  }

  public update(deltaTime: number): void {
    this.timePass += deltaTime;
  }

  public getSize(): { x: number, y: number } {
    return this.size;
  }

  public isDone(): boolean {
    return this.done;
  }

  private draw(context: CanvasRenderingContext2D, drawPoint: Vector, drawSize: Vector): void {
    context.drawImage(
      Resources.get(this.url),
      this.spritePosition.x + this.frame * this.size.x, this.spritePosition.y + this.frame * this.size.y,
      // Позиция на спрайте
      this.size.x, this.size.y, // размер на спрайте
      drawPoint.x, drawPoint.y, // координаты левого верхнего угла на канвасе
      drawSize.x, drawSize.y); // размер на канвасу
  }
}
