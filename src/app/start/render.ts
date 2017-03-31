import { gameState } from '../game-state';
import { Vector } from '../models/math-models/vector';
import { Unit } from '../models/unit';
import { appContextsType, appCanvasesType } from '../../index';
import { Resources } from '../../resources/index';

export class Renderer {
  private contexts: appContextsType;
  private canvases: appCanvasesType;
 constructor(contexts: appContextsType, canvases: appCanvasesType) {
   this.contexts = contexts;
   this.canvases = canvases;
 }
  public preRender() {
    this.renderBackground();
    this.renderStaticObjects();
  }

  public render(): void {
    this.contexts.main.drawImage(this.canvases.background, 0, 0);
    this.contexts.main.drawImage(this.canvases.fixed, 0, 0);
    this.renderEntity(gameState.getPlayer(), this.contexts.main);
  }


  private renderEntities(list: Array<Unit>, context: CanvasRenderingContext2D): void {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i], context);
    }
  }

  private renderBackground(): void {
    Resources.getImages().backgrounds.background
      .render(this.contexts.background, new Vector(0, 0), new Vector(500, 500));
  }

  private renderStaticObjects() {
   this.renderEntities(gameState.getStaticUnits(), this.contexts.fixed);
  }

  private renderEntity(entity: Unit, context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(entity.getPosition().x, entity.getPosition().y);
    context.rotate(entity.getDirection().angleTo(new Vector(1, 0)));
    entity.render(context);
    context.restore();
  }
}
